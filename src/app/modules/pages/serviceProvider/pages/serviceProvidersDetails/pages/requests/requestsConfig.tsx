import { Button, Tag } from "antd";
import { getStatusTag } from "@shared/services/sharedService";
import type { Deadline, ServiceItem } from "../../../../serviceProviders.model";
import type { Client } from "@/app/modules/pages/alwaqf/alwaqfModel";
import { EyeOutlined } from "@ant-design/icons";
import type { Quotation } from "@/app/modules/pages/followRequests/model/followRequestsModel";
export const requestsConfigColumns = (
  viewRequest: (record: ServiceItem) => void,
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
    render: (service: ServiceItem) =>
      service?.type === "service" ? "خدمة" : "باقة",
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
    key: "latest_quotation",
    dataIndex: "latest_quotation",
    title: "السعر",
    render: (latest_quotation: Quotation) => (
      <div className="flex items-center gap-1">
        <p>{latest_quotation?.price ?? "-"}</p>
        <img src="/images/SAR.svg" alt="ريال سعودي" />
      </div>
    ),
  },
  {
    key: "remaining_time",
    dataIndex: "remaining_time",
    title: "الوقت المتبقي",
    render: (remaining_time: Deadline) => {
      return (
        <span>
          {remaining_time?.remaining_days
            ? remaining_time?.remaining_days + " " + "يوم"
            : "-"}
        </span>
      );
    },
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
      <Button className="border-none!" onClick={() => viewRequest(record)}>
        <EyeOutlined />
      </Button>
    ),
  },
];
