import { getStatusTag } from "@shared/services/sharedService";
import { Tag } from "antd";
import type { Quotation } from "../../model/followRequestsModel";

export const offerDetailsColumns = [
  {
    title: "العرض السعري المقدم",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "مدة العرض",
    dataIndex: "valid_until_days",
    key: "valid_until_days",
    render: (valid_until_days: number) => {
      if (!valid_until_days) return "غير محدد";
      const label = valid_until_days === 1 ? "يوم" : "أيام";
      return `${valid_until_days} ${label}`;
    },
  },
  {
    title: "تاريخ انتهاء العرض",
    dataIndex: "valid_until",
    key: "valid_until",
  },
  {
    title: "حالة العرض",
    dataIndex: "",
    key: "",
    render: (item: Quotation) => {
      return (
        <Tag color={getStatusTag(item?.status!)?.color}>
          {item?.status_label!}
        </Tag>
      );
    },
  },
];
