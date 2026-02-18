import type { PaymentClientItem } from "@/app/modules/pages/wallet/wallet.model";
import { getStatusTag } from "@shared/services/sharedService";
import { Tag } from "antd";
import type { Invoice } from "../../../../alwaqfModel";
import { Link } from "react-router";

export const walletConfigCollumns = [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "code",
    dataIndex: "code",
    title: "رقم المعاملة",
  },
  {
    key: "payment_method_label",
    dataIndex: "payment_method_label",
    title: "طريقة الدفع",
  },
  {
    key: "total_paid",
    dataIndex: "total_paid",
    title: "المبلغ",
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    title: "تاريخ الطلب",
  },
  {
    key: "status",
    dataIndex: "status",
    title: "حالة الطلب",
    render: (status: string, record: PaymentClientItem) => (
      <Tag color={getStatusTag(status)?.color}>{record?.status_label}</Tag>
    ),
  },
  {
    key: "invoice",
    dataIndex: "invoice",
    title: "الفاتورة",
    render: (invoice: Invoice) =>
      invoice?.odoo_url ? (
        <Link to={invoice?.odoo_url} target="_blank" rel="noopener noreferrer">
          <img src="/images/download.svg" alt="تنزيل الفاتورة" />
        </Link>
      ) : (
        "-"
      ),
  },
];
