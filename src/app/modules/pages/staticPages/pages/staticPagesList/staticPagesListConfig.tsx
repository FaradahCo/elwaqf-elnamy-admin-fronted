import type { ColumnsType } from "antd/es/table";
import type { StaticPageItem } from "../../model/staticPagesModel";
import { Dropdown, Button, Tag } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface StaticPagesListColumnsProps {
  onEdit: (record: StaticPageItem) => void;
  onDelete: (record: StaticPageItem) => void;
}

export const getStaticPagesListColumns = ({
  onEdit,
  onDelete,
}: StaticPagesListColumnsProps): ColumnsType<StaticPageItem> => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "عنوان الصفحة",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "الحالة",
    dataIndex: "is_published",
    key: "is_published",
    render: (is_published: boolean) => {
      return (
        <Tag color={is_published ? "success" : "error"}>
          {is_published ? "مفعلة" : "غير مفعلة"}
        </Tag>
      );
    },
  },
  {
    title: "الإجراء",
    key: "actions",
    render: (_: any, record: StaticPageItem) => {
      const items: MenuProps["items"] = [
        {
          key: "edit",
          label: "تعديل الصفحة",
          icon: <EditOutlined />,
          onClick: () => onEdit(record),
        },
        {
          key: "delete",
          label: "حذف الصفحة",
          icon: <DeleteOutlined />,
          danger: true,
          onClick: () => onDelete(record),
        },
      ];

      return (
        <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      );
    },
  },
];
