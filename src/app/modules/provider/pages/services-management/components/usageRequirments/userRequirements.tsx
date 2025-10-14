import AddItem from "@shared/components/AddItem";
import CustomList from "@shared/components/customList/CustomList";
import { Form, Input, message } from "antd";
import { useState } from "react";
import type {
  FormnProps,
  ServiceFormData,
} from "../../servicesManagement.model";

const UserRequiremnts = ({ form }: FormnProps) => {
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const currentRequirements = Form.useWatch("requirements", form) || [];

  const handleAdd = () => {
    if (currentRequirement.trim()) {
      const newItem = { title: currentRequirement.trim() };
      const newRequirements = [...currentRequirements, newItem];
      form.setFieldsValue({ requirements: newRequirements });
      setCurrentRequirement("");
    } else {
      message.warning("يرجى إدخال وصف المتطلب");
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setCurrentRequirement(currentRequirements[index]?.title || "");
  };

  const handleUpdate = () => {
    if (currentRequirement.trim() && editingIndex !== null) {
      const newRequirements = [...currentRequirements];
      const existingItem = currentRequirements[editingIndex];

      // Preserve id if it exists, otherwise create object without id
      const updatedItem = existingItem?.id
        ? { title: currentRequirement.trim(), id: existingItem.id }
        : { title: currentRequirement.trim() };

      newRequirements[editingIndex] = updatedItem;
      form.setFieldsValue({ requirements: newRequirements });
      setCurrentRequirement("");
      setEditingIndex(null);
      message.success("تم تحديث المتطلب بنجاح");
    }
  };

  const handleDelete = (index: number) => {
    const newRequirements = currentRequirements.filter(
      (_: { title: string }, i: number) => i !== index
    );
    form.setFieldsValue({ requirements: newRequirements });
    message.success("تم حذف المتطلب بنجاح");
  };

  const handleCancel = () => {
    setCurrentRequirement("");
    setEditingIndex(null);
  };

  return (
    <div>
      <main>
        <h1 className="text-second-primary text-xl font-semibold mb-2">
          متطلبات الاستفادة
        </h1>
      </main>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          متطلبات الاستفادة
        </h1>
        <p className="text-gray-400 mb-3">
          الشروط أو الضوابط التي يجب أن تتوفر لدى العميل حتى يتمكّن من طلب
          الخدمة
        </p>

        {/* Hidden form field for requirement array */}
        <Form.Item<ServiceFormData> name="requirements" hidden>
          <Input />
        </Form.Item>

        <div className="space-y-4">
          <AddItem
            currentValue={currentRequirement}
            onValueChange={setCurrentRequirement}
            placeholder="متطلبات الاستفادة"
            editPlaceholder="تعديل متطلب الاستفادة..."
            isEditing={editingIndex !== null}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onCancel={handleCancel}
          />

          {/* Display current requirements */}
          <CustomList
            dataSource={currentRequirements}
            onEdit={handleEdit}
            onDelete={handleDelete}
            editingIndex={editingIndex}
            title="المتطلبات المضافة:"
          />
        </div>
      </div>
    </div>
  );
};

export default UserRequiremnts;
