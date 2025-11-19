import {
  EditOutlined,
  DeleteOutlined,
  HolderOutlined,
} from "@ant-design/icons";
import { Button, List } from "antd";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  item: { title: string; id?: number; order?: number };
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  editingIndex: number | null;
  itemClassName: string;
  enableDragDrop: boolean;
}

const SortableItem = ({
  id,
  item,
  index,
  onEdit,
  onDelete,
  editingIndex,
  itemClassName,
  enableDragDrop,
}: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: !enableDragDrop,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const actions = enableDragDrop
    ? [
        <Button
          key="drag"
          type="text"
          size="small"
          icon={<HolderOutlined />}
          {...attributes}
          {...listeners}
          className="text-gray-500 hover:text-gray-700 cursor-grab active:cursor-grabbing"
          title="اسحب لإعادة الترتيب"
        />,
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
      ]
    : [
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
      ];

  return (
    <div ref={setNodeRef} style={style}>
      <List.Item
        className={`${itemClassName} ${
          enableDragDrop ? "cursor-move hover:shadow-md" : ""
        } transition-shadow`}
        actions={actions}
      >
        <List.Item.Meta
          description={
            <div className="text-gray-700">
              {index + 1}. {item.title}
            </div>
          }
        />
      </List.Item>
    </div>
  );
};

interface CustomListProps {
  dataSource: { title: string; id?: number; order?: number }[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onReorder?: (
    newOrder: { title: string; id?: number; order: number }[]
  ) => void;
  editingIndex: number | null;
  title?: string;
  containerClassName?: string;
  itemClassName?: string;
  enableDragDrop?: boolean;
}

const CustomList = ({
  dataSource,
  onEdit,
  onDelete,
  onReorder,
  editingIndex,
  title = "العناصر المضافة:",
  containerClassName = "bg-gray-50 rounded-lg p-4",
  itemClassName = "bg-white mb-2 last:mb-0 rounded-md px-3 py-2",
  enableDragDrop = false,
}: CustomListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (dataSource.length === 0) {
    return null;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && onReorder) {
      const oldIndex = dataSource.findIndex(
        (_, index) => `item-${index}` === active.id
      );
      const newIndex = dataSource.findIndex(
        (_, index) => `item-${index}` === over?.id
      );

      const reorderedItems = arrayMove(dataSource, oldIndex, newIndex);

      // Assign order values to each item based on new positions
      const newOrder = reorderedItems.map((item, index) => ({
        ...item,
        order: index + 1,
      }));

      onReorder(newOrder);
    }
  };

  // Generate unique IDs for sortable items
  const items = dataSource.map((_, index) => `item-${index}`);

  const titleWithDragInfo = enableDragDrop ? (
    <div className="flex items-center gap-2">
      <HolderOutlined className="text-gray-400" />
      {title}
      <span className="text-xs text-gray-500">(اسحب لإعادة الترتيب)</span>
    </div>
  ) : (
    title
  );

  if (enableDragDrop && onReorder) {
    return (
      <div className={containerClassName}>
        <h4 className="text-sm font-medium mb-3 text-gray-700">
          {titleWithDragInfo}
        </h4>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <List
              dataSource={dataSource}
              renderItem={(
                item: { title: string; id?: number },
                index: number
              ) => (
                <SortableItem
                  key={`item-${index}`}
                  id={`item-${index}`}
                  item={item}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  editingIndex={editingIndex}
                  itemClassName={itemClassName}
                  enableDragDrop={enableDragDrop}
                />
              )}
            />
          </SortableContext>
        </DndContext>
      </div>
    );
  }

  // Fallback to regular list without drag and drop
  return (
    <div className={containerClassName}>
      <h4 className="text-sm font-medium mb-3 text-gray-700">{title}</h4>
      <List
        dataSource={dataSource}
        renderItem={(item: { title: string; id?: number }, index: number) => (
          <SortableItem
            key={`item-${index}`}
            id={`item-${index}`}
            item={item}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
            editingIndex={editingIndex}
            itemClassName={itemClassName}
            enableDragDrop={false}
          />
        )}
      />
    </div>
  );
};

export default CustomList;
