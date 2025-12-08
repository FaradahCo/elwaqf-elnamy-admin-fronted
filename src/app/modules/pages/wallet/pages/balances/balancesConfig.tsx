import type { TabsProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Wallet, WalletListParams } from "../../wallet.model";
import BalancesPlatform from "./balancesPlatform";
import BalancesProvider from "./balancesProvider";
import BalancesClient from "./balancesClient";
import type { PaginatedResponse } from "@shared/model/shared.model";

export const getTabsItems = (
  platformWallets: PaginatedResponse<Wallet>,
  providerWallets: PaginatedResponse<Wallet>,
  clientWallets: PaginatedResponse<Wallet>,
  isLoading: boolean = false,
  onChangeBalanceFilter: (filter: WalletListParams) => void
): TabsProps["items"] => [
  {
    key: "1",
    label: "المنصة",
    children: (
      <BalancesPlatform
        platformWallets={platformWallets}
        isLoading={isLoading}
        onChangeBalanceFilter={onChangeBalanceFilter}
      />
    ),
  },
  {
    key: "2",
    label: "مزودي الخدمات",
    children: (
      <BalancesProvider
        providerWallets={providerWallets}
        isLoading={isLoading}
        onChangeBalanceFilter={onChangeBalanceFilter}
      />
    ),
  },
  {
    key: "3",
    label: "العملاء",
    children: (
      <BalancesClient
        clientWallets={clientWallets}
        isLoading={isLoading}
        onChangeBalanceFilter={onChangeBalanceFilter}
      />
    ),
  },
];

export const balancesColumns: ColumnsType<Wallet> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 100,
    ellipsis: true,
  },
  {
    title: "الاسم",
    dataIndex: "ownerable",
    key: "name",
    width: 100,
    ellipsis: true,
    render: (ownerable: Wallet["ownerable"]) => ownerable?.name || "-",
  },
  // {
  //   title: "رقم الطلب",
  //   dataIndex: "id",
  //   key: "order_number",
  //   width: 100,
  //   ellipsis: true,
  //   render: (id: number) => `#${id}`,
  // },
  // {
  //   title: "مزود الخدمة",
  //   dataIndex: "ownerable",
  //   key: "provider",
  //   width: 100,
  //   ellipsis: true,
  //   render: (ownerable: Wallet["ownerable"]) =>
  //     ownerable?.type === "Provider" ? ownerable.name : "-",
  // },
  {
    title: "قيمة العرض",
    dataIndex: "total_transactions",
    key: "offer_value",
    width: 100,
    ellipsis: true,
    render: (total_transactions: string) => (
      <div className="flex items-center gap-2">
        <span>{total_transactions || "0"}</span>
        <img src="/images/SAR.svg" alt="wallet" />
      </div>
    ),
  },
  {
    title: "الربح",
    dataIndex: "available_balance",
    key: "profit",
    width: 100,
    ellipsis: true,
    render: (available_balance: string) => (
      <div className="flex items-center gap-2">
        <span>{available_balance || "0"}</span>
        <img src="/images/SAR.svg" alt="wallet" />
      </div>
    ),
  },
  {
    title: "تاريخ المعاملة",
    dataIndex: "updated_at",
    key: "transaction_date",
    width: 100,
    ellipsis: true,
  },
];

export const otherBalancesColumns: ColumnsType<Wallet> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 100,
    ellipsis: true,
  },
  {
    title: "الاسم",
    dataIndex: "ownerable",
    key: "name",
    width: 100,
    ellipsis: true,
    render: (ownerable: Wallet["ownerable"]) => ownerable?.name || "-",
  },
  {
    title: "اجمالي الأرباح",
    dataIndex: "total_transactions",
    key: "total_transactions",
    width: 100,
    ellipsis: true,
    render: (total_transactions: string) => (
      <div className="flex items-center gap-2">
        <span>{total_transactions || "0"}</span>
        <img src="/images/SAR.svg" alt="wallet" />
      </div>
    ),
  },
  {
    title: "قيد السحب",
    dataIndex: "locked_balance",
    key: "locked_balance",
    width: 100,
    ellipsis: true,
    render: (locked_balance: string) => (
      <div className="flex items-center gap-2">
        <span>{locked_balance || "0"}</span>
        <img src="/images/SAR.svg" alt="wallet" />
      </div>
    ),
  },
  {
    title: "رصيد متاح",
    dataIndex: "available_balance",
    key: "available_balance",
    width: 100,
    ellipsis: true,
    render: (available_balance: string) => (
      <div className="flex items-center gap-2">
        <span>{available_balance || "0"}</span>
        <img src="/images/SAR.svg" alt="wallet" />
      </div>
    ),
  },
  {
    title: "رصيد معلق",
    dataIndex: "pending_balance",
    key: "pending_balance",
    width: 100,
    ellipsis: true,
    render: (pending_balance: string) => (
      <div className="flex items-center gap-2">
        <span>{pending_balance || "0"}</span>
        <img src="/images/SAR.svg" alt="wallet" />
      </div>
    ),
  },
  {
    title: "تاريخ الانضمام",
    dataIndex: "updated_at",
    key: "updated_at",
    width: 100,
    ellipsis: true,
  },
];
