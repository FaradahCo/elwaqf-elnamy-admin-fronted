import { Button, Tag } from "antd";
import type { Service, ServiceRequest } from "../../../../alwaqfModel";
import { getStatusTag } from "@shared/services/sharedService";
import { EyeOutlined } from "@ant-design/icons";

export const requestsConfigColumns = (
  viewRequest: (record: ServiceRequest) => void,
) => [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "service",
    dataIndex: "service",
    title: "إسم الخدمة",
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
    title: "مجال الخدمة",
    render: (service: Service) => service?.field?.name,
  },
  {
    key: "price",
    dataIndex: "price",
    title: "السعر",
    render: (price: number) => price?.toLocaleString() ?? "-",
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
  {
    key: "actions",
    title: "استعراض الطلب",
    render: (record: ServiceRequest) => (
      <Button className="border-none!" onClick={() => viewRequest(record)}>
        <EyeOutlined />
      </Button>
    ),
  },
];
