import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, List } from "antd";

interface CustomListProps {
  dataSource: { title: string }[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  editingIndex: number | null;
  title?: string;
  containerClassName?: string;
  itemClassName?: string;
}

const CustomList = ({
  dataSource,
  onEdit,
  onDelete,
  editingIndex,
  title = "العناصر المضافة:",
  containerClassName = "bg-gray-50 rounded-lg p-4",
  itemClassName = "bg-white mb-2 last:mb-0 rounded-md px-3 py-2",
}: CustomListProps) => {
  if (dataSource.length === 0) {
    return null;
  }

  return (
    <div className={containerClassName}>
      <h4 className="text-sm font-medium mb-3 text-gray-700">{title}</h4>
      <List
        dataSource={dataSource}
        renderItem={(item: { title: string }, index: number) => (
          <List.Item
            className={itemClassName}
            actions={[
              <Button
                key="edit"
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={() => onEdit(index)}
                disabled={editingIndex !== null}
                className="text-blue-600 hover:text-blue-800"
              >
                تعديل
              </Button>,
              <Button
                key="delete"
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onDelete(index)}
                disabled={editingIndex !== null}
                className="text-red-600 hover:text-red-800"
              >
                حذف
              </Button>,
            ]}
          >
            <List.Item.Meta
              description={
                <div className="text-gray-700">
                  {index + 1}. {item.title}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CustomList;
