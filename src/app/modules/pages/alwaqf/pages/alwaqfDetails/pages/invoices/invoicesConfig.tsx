import AttachmentCell from "@shared/components/attachmentCell/attachmentCell";
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
    title: "فاتورة ضريبية مبسطة",
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
      <AttachmentCell
        url={odoo_url}
        icon={
          <img
            src="/images/download.svg"
            alt="تنزيل الفاتورة"
            title="تنزيل الفاتورة"
            className="hover:opacity-75 transition-all duration-200"
          />
        }
      />
    ),
  },
];
