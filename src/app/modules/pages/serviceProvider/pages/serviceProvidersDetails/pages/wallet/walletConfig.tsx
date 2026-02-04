import { Tag } from "antd";
import { getStatusTag } from "@shared/services/sharedService";
import type { WithdrawItem } from "@/app/modules/pages/wallet/wallet.model";
export const walletConfigColumns = [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "service",
    dataIndex: "service",
    title: "الخدمة/الباقة",
    // render: () => "",
  },
  {
    key: "service",
    dataIndex: "service",
    title: "التصنيف",
    // render: () => "",
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    title: "التاريخ",
  },

  {
    key: "code",
    dataIndex: "code",
    title: "الفاتورة",
  },
  {
    key: "amount",
    dataIndex: "amount",
    title: "المبلغ",
  },
  {
    key: "status",
    dataIndex: "status",
    title: "الحالة",
    render: (status: string, record: WithdrawItem) => (
      <Tag
        className="px-2! py-1! text-[13px]!"
        color={getStatusTag(status)?.color}
      >
        {record?.status}
      </Tag>
    ),
  },
];
