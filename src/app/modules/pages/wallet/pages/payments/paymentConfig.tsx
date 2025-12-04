import { Tag, type TabsProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router";
import type {
  PaymentClientItem,
  PaymentClientListParams,
  WithdrawItem,
} from "../../wallet.model";
import PaymentClientsList from "./paymentClientsList";
import PaymentsProvider from "./paymentsProvider";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { getStatusTag } from "@shared/services/sharedService";

export const getTabsItems = (
  paymentClients: PaginatedResponse<PaymentClientItem>,
  paymentsProvider: PaginatedResponse<WithdrawItem>,
  isLoading: boolean = false,
  onChangePaymentClientFilter: (filter: PaymentClientListParams) => void
): TabsProps["items"] => [
  {
    key: "1",
    label: "العملاء",
    children: (
      <PaymentClientsList
        paymentClients={paymentClients}
        isLoading={isLoading}
        onChangePaymentClientFilter={onChangePaymentClientFilter}
      />
    ),
  },
  {
    key: "2",
    label: "مزودي الخدمات",
    children: (
      <PaymentsProvider
        paymentsProvider={paymentsProvider}
        isLoading={isLoading}
        onChangePaymentProviderFilter={onChangePaymentClientFilter}
      />
    ),
  },
];

export const paymentClientsColumns: ColumnsType<PaymentClientItem> = [
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
  },
  {
    title: "رقم المرجع",
    dataIndex: "code",
    key: "code",
    width: 100,
    ellipsis: true,
  },
  {
    title: "المبلغ",
    dataIndex: "total_paid",
    key: "total_paid",
    width: 100,
    ellipsis: true,
    render: (total_paid: string) => (
      <div className="flex items-center gap-2">
        <span>{total_paid}</span>
        <img src="/images/SAR.svg" alt="wallet" />
      </div>
    ),
  },
  // {
  //   title: "المبلغ",
  //   dataIndex: "items",
  //   key: "items",
  //   render: (items: PaymentClientItem["items"]) =>
  //     items?.map((item) => item?.price),
  //   width: 100,
  //   ellipsis: true,
  // },
  {
    title: "وثيقة الدفع",
    dataIndex: "payment_method_label",
    key: "payment_method_label",
  },
  {
    title: "تاريخ المعاملة",
    dataIndex: "created_at",
    key: "created_at",
    width: 100,
    ellipsis: true,
  },
  {
    title: "الحالة",
    dataIndex: "items",
    key: "items",
    width: 100,
    ellipsis: true,
    render: (items: PaymentClientItem["items"]) =>
      items?.map((item) => (
        <Tag color={getStatusTag(item?.status)?.color} className="mx-2!">
          {item?.status_label}
        </Tag>
      )),
  },
];

export const paymentsProviderColumns: ColumnsType<WithdrawItem> = [
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
    render: (owner: WithdrawItem["owner"]) => owner?.name,
  },
  {
    title: "اسم المنظمة",
  },
  {
    title: "رقم المرجع",
    dataIndex: "code",
    key: "code",
    width: 100,
    ellipsis: true,
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
    dataIndex: "invoice",
    key: "invoice",
    width: 100,
    ellipsis: true,
    render: (invoice: string) => (
      <div className="flex items-center gap-2">
        {invoice ? (
          <Link
            to={invoice}
            target="_blank"
            className="text-primary! underline! cursor-pointer"
          >
            صوره الفاتورة
          </Link>
        ) : (
          <span>-</span>
        )}
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
    title: " الحالة",
    dataIndex: "status",
    key: "status",
    width: 100,
    ellipsis: true,
    render: (status: string) => (
      <Tag color={getStatusTag(status)?.color} className="mx-2!">
        {status}
      </Tag>
    ),
  },
];
