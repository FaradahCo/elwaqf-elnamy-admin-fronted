import { PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

interface AddItemProps {
  currentValue: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  editPlaceholder: string;
  isEditing: boolean;
  onAdd: () => void;
  onUpdate: () => void;
  onCancel: () => void;
  addButtonText?: string;
  updateButtonText?: string;
  cancelButtonText?: string;
  size?: "small" | "middle" | "large";
  className?: string;
}

const AddItem = ({
  currentValue,
  onValueChange,
  placeholder,
  editPlaceholder,
  isEditing,
  onAdd,
  onUpdate,
  onCancel,
  addButtonText = "إضافة",
  updateButtonText = "تحديث",
  cancelButtonText = "إلغاء",
  size = "large",
  className = "",
}: AddItemProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <Input
        type="text"
        placeholder={isEditing ? editPlaceholder : placeholder}
        size={size}
        className="flex-1"
        value={currentValue}
        onChange={(e) => onValueChange(e.target.value)}
      />
      {isEditing ? (
        <div className="flex gap-1">
          <Button
            size={size}
            onClick={onUpdate}
            className="bg-green-500 border-green-500 text-white hover:bg-green-600"
          >
            {updateButtonText}
          </Button>
          <Button
            size={size}
            onClick={onCancel}
            className="bg-gray-500 border-gray-500 text-white hover:bg-gray-600"
          >
            {cancelButtonText}
          </Button>
        </div>
      ) : (
        <Button
          size={size}
          icon={<PlusOutlined />}
          onClick={onAdd}
          className="bg-white border-2 border-primary! text-primary! hover:bg-primary! hover:text-white!"
        >
          {addButtonText}
        </Button>
      )}
    </div>
  );
};

export default AddItem;
