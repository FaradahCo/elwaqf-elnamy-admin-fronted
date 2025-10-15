import AddItem from "@shared/components/AddItem";
import CustomList from "@shared/components/customList/CustomList";
import { Form, Input, message } from "antd";
import { useState } from "react";
import type {
  FormnProps,
  ServiceFormData,
} from "../../servicesManagement.model";

const UserRequiremnts = ({ form, labels }: FormnProps) => {
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const currentRequirements = Form.useWatch("requirements", form) || [];

  const handleAdd = () => {
    if (currentRequirement.trim()) {
      // Create new item with order based on current array length
      const newItem = {
        title: currentRequirement.trim(),
        order: currentRequirements.length + 1,
      };
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

      // Preserve id and order if they exist, otherwise create object with current order
      const updatedItem = {
        title: currentRequirement.trim(),
        ...(existingItem?.id && { id: existingItem.id }),
        order: existingItem?.order || editingIndex + 1,
      };

      newRequirements[editingIndex] = updatedItem;
      form.setFieldsValue({ requirements: newRequirements });
      setCurrentRequirement("");
      setEditingIndex(null);
    }
  };
  const handleDelete = (index: number) => {
    const filteredRequirements = currentRequirements.filter(
      (_: { title: string; id?: number; order?: number }, i: number) =>
        i !== index
    );

    // Reassign order values after deletion
    const newRequirements = filteredRequirements.map(
      (item: { title: string; id?: number; order?: number }, i: number) => ({
        ...item,
        order: i + 1,
      })
    );

    form.setFieldsValue({ requirements: newRequirements });
  };

  const handleCancel = () => {
    setCurrentRequirement("");
    setEditingIndex(null);
  };

  // Handle reordering requirements
  const handleReorder = (
    newOrder: { title: string; id?: number; order: number }[]
  ) => {
    form.setFieldsValue({ requirements: newOrder });
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
          الشروط أو الضوابط التي يجب أن تتوفر لدى العميل حتى يتمكّن من طلب{" "}
          {labels?.entityAccusative}
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
            onReorder={handleReorder}
            editingIndex={editingIndex}
            title="المتطلبات المضافة:"
            enableDragDrop={true}
          />
        </div>
      </div>
    </div>
  );
};

export default UserRequiremnts;
