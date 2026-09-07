import { Tag } from "antd";
import { getStatusTag } from "@shared/services/sharedService";
import type { Deadline, ServiceItem } from "../../../../serviceProviders.model";
import type { User } from "@/app/modules/authentication/authentication.model";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
export const consultationConfigColumns = (
  viewConsultation: (record: ServiceItem) => void,
) => [
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
    render: (remaining_time: Deadline) =>
      remaining_time?.remaining_days
        ? remaining_time?.remaining_days + " " + "يوم"
        : "-",
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
  {
    key: "actions",
    title: "استعراض الطلب",
    render: (record: ServiceItem) => (
      <Button className="border-none!" onClick={() => viewConsultation(record)}>
        <EyeOutlined />
      </Button>
    ),
  },
];
