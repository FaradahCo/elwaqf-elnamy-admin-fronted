import { Tag } from "antd";
import { getStatusTag } from "@shared/services/sharedService";
import type { ServiceItem } from "../../../../serviceProviders.model";
import type { User } from "@/app/modules/authentication/authentication.model";
export const consultationConfigColumns = [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "service",
    dataIndex: "service",
    title: "التصنيف",
    render: () => "استشارة",
  },
  {
    key: "user",
    dataIndex: "user",
    title: "اسم العميل",
    render: (user: User) => user?.name,
  },

  {
    key: "created_at",
    dataIndex: "created_at",
    title: "تاريخ الطلب",
  },
  {
    key: "remaining_time",
    dataIndex: "remaining_time",
    title: "الوقت المتبقي",
  },
  {
    key: "status",
    dataIndex: "status",
    title: "الحالة",
    render: (status: string, record: ServiceItem) => (
      <Tag
        className="px-2! py-1! text-[13px]!"
        color={getStatusTag(status)?.color}
      >
        {record?.status_label}
      </Tag>
    ),
  },
];
