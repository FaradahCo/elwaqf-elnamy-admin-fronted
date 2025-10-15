import AddItem from "@shared/components/AddItem";
import CustomList from "@shared/components/customList/CustomList";
import { useApiQuery } from "@shared/services/api";
import { Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import type {
  Field,
  FormnProps,
  ServiceFormData,
} from "../../servicesManagement.model";
import { ServiceManagenetsService } from "../../servicesManagemts.service";

const MainInformation = ({ form, labels }: FormnProps) => {
  const [currentOutput, setCurrentOutput] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentScope, setCurrentScope] = useState("");
  const [editingScopeIndex, setEditingScopeIndex] = useState<number | null>(
    null
  );

  const serviseCalssificationQuery = useApiQuery<Field[]>(
    ["service-classifications"],
    () => ServiceManagenetsService.getFields(),
    { retry: false }
  );

  // Watch form fields for real-time updates
  const currentOutputs = Form.useWatch("outputs", form) || [];
  const currentScopes = Form.useWatch("scopes", form) || [];

  // Generic handlers that work for both outputs and scopes
  const handleAdd = (fieldName: "outputs" | "scopes") => {
    const currentValue = fieldName === "outputs" ? currentOutput : currentScope;
    const currentArray =
      fieldName === "outputs" ? currentOutputs : currentScopes;
    const setValue =
      fieldName === "outputs" ? setCurrentOutput : setCurrentScope;
    const warningMessage =
      fieldName === "outputs"
        ? "يرجى إدخال وصف المخرج"
        : "يرجى إدخال وصف النطاق";

    if (currentValue.trim()) {
      const newItem = {
        title: currentValue.trim(),
        order: currentArray.length + 1,
      };
      const newArray = [...currentArray, newItem];
      form.setFieldsValue({ [fieldName]: newArray });
      setValue("");
    } else {
      message.warning(warningMessage);
    }
  };

  const handleEdit = (index: number, fieldName: "outputs" | "scopes") => {
    const currentArray =
      fieldName === "outputs" ? currentOutputs : currentScopes;
    const setValue =
      fieldName === "outputs" ? setCurrentOutput : setCurrentScope;
    const setEditingIndexFn =
      fieldName === "outputs" ? setEditingIndex : setEditingScopeIndex;

    setEditingIndexFn(index);
    setValue(currentArray[index]?.title || "");
  };

  const handleUpdate = (fieldName: "outputs" | "scopes") => {
    const currentValue = fieldName === "outputs" ? currentOutput : currentScope;
    const currentArray =
      fieldName === "outputs" ? currentOutputs : currentScopes;
    const editingIndexValue =
      fieldName === "outputs" ? editingIndex : editingScopeIndex;
    const setValue =
      fieldName === "outputs" ? setCurrentOutput : setCurrentScope;
    const setEditingIndexFn =
      fieldName === "outputs" ? setEditingIndex : setEditingScopeIndex;

    if (currentValue.trim() && editingIndexValue !== null) {
      const newArray = [...currentArray];
      const existingItem = currentArray[editingIndexValue];

      const updatedItem = {
        title: currentValue.trim(),
        ...(existingItem?.id && { id: existingItem.id }),
        order: existingItem?.order || editingIndexValue + 1,
      };

      newArray[editingIndexValue] = updatedItem;
      form.setFieldsValue({ [fieldName]: newArray });
      setValue("");
      setEditingIndexFn(null);
    }
  };

  const handleDelete = (index: number, fieldName: "outputs" | "scopes") => {
    const currentArray =
      fieldName === "outputs" ? currentOutputs : currentScopes;

    const filteredArray = currentArray.filter(
      (_: { title: string; id?: number; order?: number }, i: number) =>
        i !== index
    );

    // Reassign order values after deletion
    const newArray = filteredArray.map(
      (item: { title: string; id?: number; order?: number }, i: number) => ({
        ...item,
        order: i + 1,
      })
    );

    form.setFieldsValue({ [fieldName]: newArray });
  };

  const handleCancel = (fieldName: "outputs" | "scopes") => {
    const setValue =
      fieldName === "outputs" ? setCurrentOutput : setCurrentScope;
    const setEditingIndexFn =
      fieldName === "outputs" ? setEditingIndex : setEditingScopeIndex;

    setValue("");
    setEditingIndexFn(null);
  };

  // Handle reordering for outputs and scopes
  const handleReorder = (
    fieldName: "outputs" | "scopes",
    newOrder: { title: string; id?: number; order: number }[]
  ) => {
    form.setFieldsValue({ [fieldName]: newOrder });
  };

  return (
    <div>
      <main>
        <h1 className="text-second-primary text-xl font-semibold mb-2">
          المعلومات الأساسية
        </h1>
        <p className="text-gray-400">
          أدخِل المعلومات الأساسية الخاصة ب{labels?.entityGenitive || "خدمتك"}،
          بما في ذلك الاسم والوصف والتصنيف. تأكد من أن البيانات دقيقة وواضحة
          لتسهيل مراجعتها واعتمادها.
        </p>
      </main>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          اسم {labels?.entity}
        </h1>
        <p className="text-gray-400 mb-3">
          اكتب اسمًا يصف {labels?.entityAccusative} بوضوح{" "}
        </p>

        <Form.Item<ServiceFormData>
          name="title"
          rules={[
            {
              required: true,
              message: `يرجى إدخال اسم ${labels?.entityGenitive}`,
            },
            { min: 3, message: "يجب أن يكون الاسم 3 أحرف على الأقل" },
          ]}
        >
          <Input
            type="text"
            placeholder="اسم واضح يصف المخرجات بدقّة"
            size="large"
          />
        </Form.Item>
      </div>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          تصنيف {labels?.entityGenitive}
        </h1>
        <p className="text-gray-400 mb-3">
          اختر التصنيف الذي يعبّر عن نوع {labels?.entityGenitive}
        </p>

        <Form.Item<ServiceFormData>
          name="field_id"
          rules={[
            {
              required: true,
              message: `يرجى اختيار تصنيف ${labels?.entityGenitive}`,
            },
          ]}
        >
          <Select
            size="large"
            placeholder={`اختر تصنيف ${labels?.entityGenitive}`}
          >
            {serviseCalssificationQuery.data
              ?.filter((item) => item.selected)
              ?.map((classification) => (
                <Select.Option
                  key={classification.id}
                  value={classification.id}
                >
                  {classification.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          وصف {labels?.entityGenitive}
        </h1>
        <p className="text-gray-400 mb-3">
          صف {labels?.entityAccusative} وآلية تنفيذها والفائدة المتوقعة
        </p>

        <Form.Item<ServiceFormData>
          name="description"
          rules={[
            {
              required: true,
              message: `يرجى إدخال وصف ${labels?.entityGenitive}`,
            },
            { min: 20, message: "يجب أن يكون الوصف 20 حرف على الأقل" },
          ]}
        >
          <TextArea rows={4} placeholder="يرجى كتابة وصف تفصيلي للخدمة" />
        </Form.Item>
      </div>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          مخرجات {labels?.entityGenitive}
        </h1>
        <p className="text-gray-400 mb-3">
          اذكر ما سيستلمه العميل بعد تنفيذ {labels?.entityGenitive}
        </p>

        {/* Hidden form field for output array */}
        <Form.Item<ServiceFormData> name="outputs" hidden>
          <Input />
        </Form.Item>

        <div className="space-y-4">
          <AddItem
            currentValue={currentOutput}
            onValueChange={setCurrentOutput}
            placeholder={`مخرجات ${labels?.entityGenitive}`}
            editPlaceholder={`تعديل مخرج ${labels?.entityGenitive}...`}
            isEditing={editingIndex !== null}
            onAdd={() => handleAdd("outputs")}
            onUpdate={() => handleUpdate("outputs")}
            onCancel={() => handleCancel("outputs")}
          />

          {/* Display current outputs */}
          <CustomList
            dataSource={currentOutputs}
            onEdit={(index: number) => handleEdit(index, "outputs")}
            onDelete={(index: number) => handleDelete(index, "outputs")}
            onReorder={(
              newOrder: { title: string; id?: number; order: number }[]
            ) => handleReorder("outputs", newOrder)}
            editingIndex={editingIndex}
            title="المخرجات المضافة:"
            enableDragDrop={true}
          />
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          نطاق {labels?.entityGenitive}
        </h1>
        <p className="text-gray-400 mb-3">
          وضّح حدود {labels?.entityGenitive} وما يشمله التنفيذ
        </p>

        {/* Hidden form field for scope array */}
        <Form.Item<ServiceFormData> name="scopes" hidden>
          <Input />
        </Form.Item>

        <div className="space-y-4">
          <AddItem
            currentValue={currentScope}
            onValueChange={setCurrentScope}
            placeholder={`نطاق ${labels?.entityGenitive}`}
            editPlaceholder={`تعديل نطاق ${labels?.entityGenitive}...`}
            isEditing={editingScopeIndex !== null}
            onAdd={() => handleAdd("scopes")}
            onUpdate={() => handleUpdate("scopes")}
            onCancel={() => handleCancel("scopes")}
          />

          {/* Display current scopes */}
          <CustomList
            dataSource={currentScopes}
            onEdit={(index: number) => handleEdit(index, "scopes")}
            onDelete={(index: number) => handleDelete(index, "scopes")}
            onReorder={(
              newOrder: { title: string; id?: number; order: number }[]
            ) => handleReorder("scopes", newOrder)}
            editingIndex={editingScopeIndex}
            title={`نطاقات ${labels?.entityGenitive} المضافة:`}
            enableDragDrop={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MainInformation;
