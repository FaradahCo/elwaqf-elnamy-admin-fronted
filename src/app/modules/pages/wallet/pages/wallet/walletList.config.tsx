import { store } from "@/app/store";
import {
  setSelectedBankTransfer,
  setSelectedWithdraw,
} from "@/app/store/slices/walletSlice";
import type { PaginatedResponse } from "@shared/model/shared.model";
import {
  handleDownloadAttachment,
  ownerTypeConfig,
} from "@shared/services/sharedService";
import type { TabsProps } from "antd";
import { Button } from "antd/es/radio";
import type { ColumnsType } from "antd/es/table";
import type {
  BankTransferItem,
  Owner,
  WithdrawItem,
  WithdrawListParams,
} from "../../wallet.model";
import DepositeList from "./depositeList";
import WithdrawList from "./withdrawList";

export const getTabsItems = (
  withdrawList: PaginatedResponse<WithdrawItem>,
  bankTransferList: PaginatedResponse<BankTransferItem>,
  isLoading: boolean = false,
  onChangeWithdrawListFilter: (filter: WithdrawListParams) => void,
): TabsProps["items"] => [
  {
    key: "1",
    label: "سحب",
    children: (
      <WithdrawList
        withdrawList={withdrawList}
        isLoading={isLoading}
        onChangeWithdrawListFilter={onChangeWithdrawListFilter}
      />
    ),
  },
  {
    key: "2",
    label: "إيداع",
    children: (
      <DepositeList
        depositeList={bankTransferList}
        isLoading={isLoading}
        onChangeDepositeListFilter={onChangeWithdrawListFilter}
      />
    ),
  },
];

export const withDrawListColumns: ColumnsType<WithdrawItem> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 100,
    ellipsis: true,
  },
  {
    title: "الاسم",
    dataIndex: "owner",
    key: "name",
    width: 100,
    ellipsis: true,
    render: (owner: Owner) => owner?.name,
  },
  {
    title: "الصفة",
    dataIndex: "owner",
    key: "type",
    width: 100,
    ellipsis: true,
    render: (owner: Owner) => ownerTypeConfig[owner?.type]?.label,
  },
  {
    title: "نوع الطلب",
    dataIndex: "item_id",
    key: "item_id",
    width: 100,
    ellipsis: true,
    render: () => "سحب أرباح",
  },
  {
    title: "المبلغ",
    dataIndex: "amount",
    key: "amount",
    width: 100,
    ellipsis: true,
    render: (amount: string) => (
      <div className="flex items-center gap-2">
        <span>{amount}</span>
        <img src="/images/SAR.svg" alt="wallet" />
      </div>
    ),
  },
  {
    title: "وثيقة الدفع",
    width: 100,
    ellipsis: true,
    render: (item: WithdrawItem) => (
      <div className="flex items-center gap-2">
        <p
          onClick={() => handleDownloadAttachment(item?.invoice?.url!)}
          className="text-primary! underline! cursor-pointer"
        >
          صوره الفاتورة
        </p>
      </div>
    ),
  },
  {
    title: "تاريخ المعاملة",
    dataIndex: "created_at",
    key: "created_at",
    width: 100,
    ellipsis: true,
  },
  {
    title: "الإجراء",
    dataIndex: "",
    key: "",
    width: 100,
    ellipsis: true,
    render: (record: WithdrawItem) => (
      <Button
        type="primary"
        className="border border-primary! text-primary! hover:bg-primary! hover:text-white!"
        onClick={() => store.dispatch(setSelectedWithdraw(record))}
      >
        تأكيد المعاملة
      </Button>
    ),
  },
];

export const bankTransferListColumns: ColumnsType<BankTransferItem> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 100,
    ellipsis: true,
  },
  {
    title: "الاسم",
    dataIndex: "name",
    key: "name",
    width: 100,
    ellipsis: true,
  },
  {
    title: "الصفة",
    dataIndex: "owner",
    key: "type",
    width: 100,
    ellipsis: true,
    render: () => "عميل",
  },
  {
    title: "نوع الطلب",
    dataIndex: "item_id",
    key: "item_id",
    width: 100,
    ellipsis: true,
    render: () => "إيداع حوالة",
  },
  {
    title: "المبلغ",
    width: 100,
    ellipsis: true,
    render: (item: BankTransferItem) => (
      <div className="flex items-center gap-2">
        <span>{item?.payment?.total_paid}</span>
        <img src="/images/SAR.svg" alt="wallet" />
      </div>
    ),
  },
  {
    title: "وثيقة الدفع",

    width: 100,
    ellipsis: true,
    render: (item: BankTransferItem) => {
      return (
        <div className="flex items-center gap-2">
          <p
            onClick={() =>
              handleDownloadAttachment(item?.transfer_receipt?.url!)
            }
            className="text-primary! underline! cursor-pointer"
          >
            صوره الحوالة
          </p>
        </div>
      );
    },
  },
  {
    title: "تاريخ المعاملة",
    dataIndex: "created_at",
    key: "created_at",
    width: 100,
    ellipsis: true,
  },
  {
    title: "الإجراء",
    dataIndex: "",
    key: "",
    width: 100,
    ellipsis: true,
    render: (record: BankTransferItem) => (
      <Button
        type="primary"
        className="border border-primary! text-primary! hover:bg-primary! hover:text-white!"
        onClick={() => store.dispatch(setSelectedBankTransfer(record))}
      >
        تأكيد المعاملة
      </Button>
    ),
  },
];
