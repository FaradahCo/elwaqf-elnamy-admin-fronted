import { Tag } from "antd";
import { getStatusTag } from "@shared/services/sharedService";
import type {
  Client,
  FollowRequest,
  Quotation,
} from "../../model/followRequestsModel";
import type { ServiceData } from "../../../serviceManagement/model/serviceProviderList";
import { SERVICE_TYPE } from "@shared/model/shared.model";
export const followRequestsColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "التصنيف",
    render: (item: FollowRequest) => (
      <span>
        {SERVICE_TYPE[item?.service?.type as keyof typeof SERVICE_TYPE]}
      </span>
    ),
  },
  {
    title: "اسم العميل",
    dataIndex: "client",
    key: "name",
    render: (client: Client) => <span>{client?.name}</span>,
  },
  {
    title: "اسم الخدمة",
    dataIndex: "service",
    key: "service",
    render: (service: ServiceData) => <span>{service?.title}</span>,
  },
  {
    title: "مجال الخدمة",
    dataIndex: "service",
    key: "service",
    render: (service: ServiceData) => <span>{service?.field?.name}</span>,
  },
  {
    title: "السعر",
    dataIndex: "latest_quotation",
    key: "latest_quotation",
    render: (latest_quotation: Quotation) =>
      latest_quotation ? <span>{latest_quotation?.price} ر.س</span> : "-",
  },
  {
    title: "تاريخ الطلب",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "الحالة",
    dataIndex: "",
    key: "",
    render: (item: FollowRequest) => (
      <Tag
        className="px-2! py-1! text-[13px]!"
        color={getStatusTag(item?.status!).color}
      >
        {item.status_label}
      </Tag>
    ),
  },
];
