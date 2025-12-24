import { getStatusTag } from "@shared/services/sharedService";
import { Tag } from "antd";
import type { Fields, ServiceProviders } from "../../serviceProviders.model";
export const serviceProvidersListColumns = [
  {
    title: "ID",
    dataIndex: "user_id",
    key: "user_id",
  },
  {
    title: "مزود الخدمة",
    dataIndex: "user_name",
    key: "user_name",
  },

  {
    title: "تاريخ الانضمام",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "مجال الخدمة",
    dataIndex: "fields",
    key: "fields",
    render: (fields: Fields) => (
      <p className="text-xs">{fields?.map((field) => field.name).join(", ")}</p>
    ),
  },
  {
    title: "الحالة",
    dataIndex: "status",
    key: "status",
    render: (status: string, record: ServiceProviders) => (
      <Tag
        className="px-2! py-1! text-[13px]!"
        color={getStatusTag(status).color}
      >
        {record.status_label}
      </Tag>
    ),
  },
  {
    title: "الإجراءات",
    key: "actions",
    render: (_: any, record: ServiceProviders) => (
      <div className="flex gap-2">
        <a href={`/admin/service-providers/details/${record.team_id}`} className="text-primary hover:underline">
          عرض الملف
        </a>
        {record.status === "review" && (
           <a href={`/admin/service-providers/reviews/${record.team_id}`} className="text-orange-500 hover:underline">
            مراجعة
          </a>
        )}
      </div>
    ),
  },
];

