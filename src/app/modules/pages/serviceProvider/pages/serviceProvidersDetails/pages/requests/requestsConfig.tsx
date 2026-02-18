import { Tag } from "antd";
import { getStatusTag } from "@shared/services/sharedService";
import type { ServiceItem } from "../../../../serviceProviders.model";
import type { Client } from "@/app/modules/pages/alwaqf/alwaqfModel";
export const requestsConfigColumns = [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "service",
    dataIndex: "service",
    title: "التصنيف",
    render: (service: ServiceItem) => service?.type,
  },
  {
    key: "service",
    dataIndex: "service",
    title: "الطلب",
    render: (service: ServiceItem) => service?.title,
  },
  {
    key: "client",
    dataIndex: "client",
    title: "اسم العميل",
    render: (client: Client) => client?.name,
  },

  {
    key: "created_at",
    dataIndex: "created_at",
    title: "تاريخ الطلب",
  },
  {
    key: "service",
    dataIndex: "service",
    title: "السعر",
    render: (service: ServiceItem) => (
      <div className="flex items-center gap-1">
        <p>{service?.min_price}</p>
        <img src="/images/SAR.svg" alt="ريال سعودي" />
      </div>
    ),
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
