import { Tag } from "antd";
import { getStatusTag } from "@shared/services/sharedService";
import type { ServiceItem } from "../../../../serviceProviders.model";
import type { Field } from "@shared/model/shared.model";
export const providerServicesConfigColumns = [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "title",
    dataIndex: "title",
    title: "اسم الخدمة",
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    title: "تاريخ الإضافة",
  },

  {
    key: "type",
    dataIndex: "type",
    title: "الخدمة",
  },
  {
    key: "field",
    dataIndex: "field",
    title: "مجال الخدمة",
    render: (field: Field) => field?.name,
  },
  {
    key: "min_price",
    dataIndex: "min_price",
    title: "السعر يبدأ من",
    render: (min_price: number) => (
      <div className="flex items-center gap-1">
        <p>{min_price}</p>
        <img src="/images/SAR.svg" alt="ريال سعودي" />
      </div>
    ),
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
