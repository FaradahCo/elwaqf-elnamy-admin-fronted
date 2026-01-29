import { handleDownloadAttachment } from "@shared/services/sharedService";
import type { Payment } from "../../../../alwaqfModel";

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
        <img
          onClick={() => handleDownloadAttachment(odoo_url)}
          src="/images/download.svg"
          alt="تنزيل الفاتورة"
          className="cursor-pointer"
        />
      </div>
    ),
  },
];
