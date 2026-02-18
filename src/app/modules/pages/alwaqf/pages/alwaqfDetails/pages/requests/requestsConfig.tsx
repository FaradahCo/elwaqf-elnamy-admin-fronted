import { Tag } from "antd";
import type { Service, ServiceRequest } from "../../../../alwaqfModel";
import { getStatusTag } from "@shared/services/sharedService";

export const requestsConfigColumns = [
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
    key: "service",
    dataIndex: "service",
    title: "مزود الخدمة",
    render: (service: Service) => service?.provider?.business_name,
  },
  {
    key: "service",
    dataIndex: "service",
    title: "مجال الطلب",
    render: (service: Service) => service?.field?.name,
  },
  {
    key: "service",
    dataIndex: "service",
    title: "تاريخ الطلب",
    render: (service: Service) => service?.created_at,
  },
  {
    key: "status",
    dataIndex: "status",
    title: "حالة الطلب",
    render: (status: string, record: ServiceRequest) => (
      <Tag
        className="px-2! py-1! text-[13px]!"
        color={getStatusTag(status)?.color}
      >
        {record?.status_label}
      </Tag>
    ),
  },
];
