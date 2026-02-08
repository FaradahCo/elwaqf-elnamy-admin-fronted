import type { Payment } from "@/app/modules/pages/alwaqf/alwaqfModel";

export const invoicesConfigColumns = [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "type",
    dataIndex: "type",
    title: "الخدمة/الباقة",
  },
  {
    key: "type",
    dataIndex: "type",
    title: "التصنيف",
  },

  {
    key: "created_at",
    dataIndex: "created_at",
    title: "التاريخ",
  },
  {
    key: "code",
    dataIndex: "code",
    title: "فاتورة ضريبية",
  },
  {
    key: "payment",
    dataIndex: "payment",
    title: "المبلغ",
    render: (payment: Payment) => <span>{payment?.total_paid}</span>,
  },
];
