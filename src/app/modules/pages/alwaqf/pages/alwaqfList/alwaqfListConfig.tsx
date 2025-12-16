import { getStatusTag } from "@shared/services/sharedService";
import { Tag } from "antd";
import type { Alwaqf } from "../../alwaqfModel";

export const alwaqfColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "اسم المستخدم",
    dataIndex: "user_name",
    key: "user_name",
  },
  {
    title: "اسم المنظمة",
    dataIndex: "waqf_name",
    key: "waqf_name",
  },
  {
    title: "تاريخ الانضمام",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "الحالة",
    dataIndex: "status",
    key: "status",
    render: (status: string, record: Alwaqf) => (
      <Tag
        className="px-2! py-1! text-[13px]!"
        color={getStatusTag(status)?.color}
      >
        {record?.status_label}
      </Tag>
    ),
  },
];
