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
        {odoo_url ? (
          <img
            src="/images/download.svg"
            alt="تنزيل الفاتورة"
            onClick={() => handleDownloadAttachment(odoo_url)}
          />
        ) : (
          "-"
        )}
      </div>
    ),
  },
];
