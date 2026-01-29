import { getStatusTag } from "@shared/services/sharedService";
import { Tag } from "antd";
import type { Alwaqf } from "../../alwaqfModel";
import { Link } from "react-router";
import { alwaqfRoutePath } from "../../alwaqfRoutes";

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
    render: (user_name: string, record: Alwaqf) => (
      <Link
        to={alwaqfRoutePath.ALWAQF_DETAILS(record?.id!)}
        className="text-primary! hover:text-shadow-primary! hover:underline! transition-all!"
        title={user_name}
      >
        {user_name}
      </Link>
    ),
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
