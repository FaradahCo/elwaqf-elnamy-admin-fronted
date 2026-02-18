import type { Payment } from "@/app/modules/pages/alwaqf/alwaqfModel";

export const invoicesConfigColumns = [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "payment",
    dataIndex: "payment",
    title: "الخدمة/الباقة",
    render: (payment: Payment) => (
      <span>{payment?.items?.at(0)?.service?.title}</span>
    ),
  },
  {
    key: "payment",
    dataIndex: "payment",
    title: "التصنيف",
    render: (payment: Payment) => (
      <span>
        {payment?.items?.at(0)?.service?.type === "service" ? "خدمة" : "باقة"}
      </span>
    ),
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
    render: (payment: Payment) => (
      <div className="flex gap-1 items-center">
        <span>{payment?.total_paid}</span>
        <span>
          <img src="/images/SAR.svg" alt="ريال سعودي" />
        </span>
      </div>
    ),
  },
];
