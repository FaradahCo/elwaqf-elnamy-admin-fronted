import { Tag } from "antd";
import type {
  Consultation,
  Service,
  ServiceRequest,
  TeamProvider,
} from "../../../../alwaqfModel";
import { getStatusTag } from "@shared/services/sharedService";

export const consultationConfigColumns = [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "service",
    dataIndex: "service",
    title: "الخدمة",
    render: (service: Service) => service?.title,
  },
  {
    key: "team",
    dataIndex: "team",
    title: "مزود الخدمة",
    render: (team: TeamProvider) => team?.name,
  },
  {
    key: "team",
    dataIndex: "team",
    title: "مجال الطلب",
    render: (team: TeamProvider) =>
      team?.fields?.map((field) => field.name).join(", "),
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    title: "تاريخ الطلب",
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
];
