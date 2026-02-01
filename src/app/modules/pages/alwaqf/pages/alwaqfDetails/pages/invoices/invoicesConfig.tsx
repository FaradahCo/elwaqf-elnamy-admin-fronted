import type { Payment } from "../../../../alwaqfModel";
import { Link } from "react-router";

export const invoicesConfigColumns = [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "code",
    dataIndex: "code",
    title: "فاتورة ضريبية",
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    title: "تاريخ الفاتورة",
  },
  {
    key: "service",
    dataIndex: "service",
    title: "مزود الخدمة",
  },
  {
    key: "service",
    dataIndex: "service",
    title: "الخدمة",
  },
  {
    key: "payment",
    dataIndex: "payment",
    title: "طريقة الدفع",
    render: (payment: Payment) => payment?.payment_method_label,
  },
  {
    key: "total_cost",
    dataIndex: "total_cost",
    title: "المبلغ",
  },
  {
    key: "odoo_url",
    dataIndex: "odoo_url",
    title: "الفاتورة",
    render: (odoo_url: string) => (
      <div className="flex items-center gap-2">
        <Link to={odoo_url} target="_blank" rel="noopener noreferrer">
          <img src="/images/download.svg" alt="تنزيل الفاتورة" />
        </Link>
      </div>
    ),
  },
];
