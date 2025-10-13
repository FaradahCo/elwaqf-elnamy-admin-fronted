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

const MainInformation = ({ form }: FormnProps) => {
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
      // Create new item without id for new items
      const newItem = { title: currentValue.trim() };
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
    const successMessage =
      fieldName === "outputs"
        ? "تم تحديث المخرج بنجاح"
        : "تم تحديث النطاق بنجاح";

    if (currentValue.trim() && editingIndexValue !== null) {
      const newArray = [...currentArray];
      const existingItem = currentArray[editingIndexValue];

      // Preserve id if it exists, otherwise create object without id
      const updatedItem = existingItem?.id
        ? { title: currentValue.trim(), id: existingItem.id }
        : { title: currentValue.trim() };

      newArray[editingIndexValue] = updatedItem;
      form.setFieldsValue({ [fieldName]: newArray });
      setValue("");
      setEditingIndexFn(null);
      message.success(successMessage);
    }
  };

  const handleDelete = (index: number, fieldName: "outputs" | "scopes") => {
    const currentArray =
      fieldName === "outputs" ? currentOutputs : currentScopes;
    const successMessage =
      fieldName === "outputs" ? "تم حذف المخرج بنجاح" : "تم حذف النطاق بنجاح";

    const newArray = currentArray.filter(
      (_: { title: string }, i: number) => i !== index
    );
    form.setFieldsValue({ [fieldName]: newArray });
    message.success(successMessage);
  };

  const handleCancel = (fieldName: "outputs" | "scopes") => {
    const setValue =
      fieldName === "outputs" ? setCurrentOutput : setCurrentScope;
    const setEditingIndexFn =
      fieldName === "outputs" ? setEditingIndex : setEditingScopeIndex;

    setValue("");
    setEditingIndexFn(null);
  };

  return (
    <div>
      <main>
        <h1 className="text-second-primary text-xl font-semibold mb-2">
          المعلومات الأساسية
        </h1>
        <p className="text-gray-400">
          أدخِل المعلومات الأساسية الخاصة بخدمتك، بما في ذلك الاسم والوصف
          والتصنيف. تأكد من أن البيانات دقيقة وواضحة لتسهيل مراجعتها واعتمادها.
        </p>
      </main>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          اسم الخدمة
        </h1>
        <p className="text-gray-400 mb-3">اكتب اسمًا يصف الخدمة بوضوح </p>

        <Form.Item<ServiceFormData>
          name="title"
          rules={[
            { required: true, message: "يرجى إدخال اسم الخدمة" },
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
          تصنيف الخدمة
        </h1>
        <p className="text-gray-400 mb-3">
          اختر التصنيف الذي يعبّر عن نوع الخدمة
        </p>

        <Form.Item<ServiceFormData>
          name="field_id"
          rules={[{ required: true, message: "يرجى اختيار تصنيف الخدمة" }]}
        >
          <Select size="large" placeholder="اختر تصنيف الخدمة">
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
          وصف الخدمة
        </h1>
        <p className="text-gray-400 mb-3">
          صف الخدمة وآلية تنفيذها والفائدة المتوقعة
        </p>

        <Form.Item<ServiceFormData>
          name="description"
          rules={[
            { required: true, message: "يرجى إدخال وصف الخدمة" },
            { min: 20, message: "يجب أن يكون الوصف 20 حرف على الأقل" },
          ]}
        >
          <TextArea rows={4} placeholder="يرجى كتابة وصف تفصيلي للخدمة" />
        </Form.Item>
      </div>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          مخرجات الخدمة
        </h1>
        <p className="text-gray-400 mb-3">
          اذكر ما سيستلمه العميل بعد تنفيذ الخدمة
        </p>

        {/* Hidden form field for output array */}
        <Form.Item<ServiceFormData> name="outputs" hidden>
          <Input />
        </Form.Item>

        <div className="space-y-4">
          <AddItem
            currentValue={currentOutput}
            onValueChange={setCurrentOutput}
            placeholder="مخرجات الخدمة"
            editPlaceholder="تعديل مخرج الخدمة..."
            isEditing={editingIndex !== null}
            onAdd={() => handleAdd("outputs")}
            onUpdate={() => handleUpdate("outputs")}
            onCancel={() => handleCancel("outputs")}
          />

          {/* Display current outputs */}
          <CustomList
            dataSource={currentOutputs}
            onEdit={(index) => handleEdit(index, "outputs")}
            onDelete={(index) => handleDelete(index, "outputs")}
            editingIndex={editingIndex}
            title="المخرجات المضافة:"
          />
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          نطاق الخدمة
        </h1>
        <p className="text-gray-400 mb-3">وضّح حدود الخدمة وما يشمله التنفيذ</p>

        {/* Hidden form field for scope array */}
        <Form.Item<ServiceFormData> name="scopes" hidden>
          <Input />
        </Form.Item>

        <div className="space-y-4">
          <AddItem
            currentValue={currentScope}
            onValueChange={setCurrentScope}
            placeholder="نطاق الخدمة"
            editPlaceholder="تعديل نطاق الخدمة..."
            isEditing={editingScopeIndex !== null}
            onAdd={() => handleAdd("scopes")}
            onUpdate={() => handleUpdate("scopes")}
            onCancel={() => handleCancel("scopes")}
          />

          {/* Display current scopes */}
          <CustomList
            dataSource={currentScopes}
            onEdit={(index) => handleEdit(index, "scopes")}
            onDelete={(index) => handleDelete(index, "scopes")}
            editingIndex={editingScopeIndex}
            title="نطاقات الخدمة المضافة:"
          />
        </div>
      </div>
    </div>
  );
};

export default MainInformation;
