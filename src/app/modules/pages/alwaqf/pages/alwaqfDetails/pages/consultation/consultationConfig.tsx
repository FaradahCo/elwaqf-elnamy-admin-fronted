import { Button, Tag } from "antd";
import type {
  Consultation,
  RemainingTime,
  Service,
  ServiceRequest,
  TeamProvider,
} from "../../../../alwaqfModel";
import { getStatusTag } from "@shared/services/sharedService";

import { EyeOutlined } from "@ant-design/icons";

export const consultationConfigColumns = (
  viewConsultation: (record: ServiceRequest | Consultation) => void,
) => [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "service",
    dataIndex: "service",
    title: "اسم الخدمة",
    render: (service: Service) => service?.title ?? "-",
  },
  {
    key: "team",
    dataIndex: "team",
    title: "مزود الخدمة",
    render: (team: TeamProvider) => team?.name,
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
    render: (remaining_time: RemainingTime) =>
      remaining_time?.remaining_days ?? "-",
  },
  {
    key: "team",
    dataIndex: "team",
    title: "مجال الطلب",
    render: (team: TeamProvider) =>
      team?.fields?.map((field) => field.name).join(", "),
  },

  {
    key: "status",
    dataIndex: "status",
    title: "حالة الطلب",
    render: (status: string, record: ServiceRequest | Consultation) => (
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
    render: (record: ServiceRequest | Consultation) => (
      <Button className="border-none!" onClick={() => viewConsultation(record)}>
        <EyeOutlined />
      </Button>
    ),
  },
];
