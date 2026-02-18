export const confirmationRequestsColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "الاسم",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "الصفة",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "نوع الطلب",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "المبلغ",
    dataIndex: "amount",
    key: "amount",
    render: (amount: number) => (
      <div className="flex gap-1 items-center">
        <span>{amount}</span>
        <span>
          <img src="/images/SAR.svg" alt="ريال سعودي" />
        </span>
      </div>
    ),
  },
  {
    title: "وثيقة الدفع",
    dataIndex: "client_name",
    key: "client_name",
  },
  {
    title: "تاريخ المعاملة",
    dataIndex: "transaction_date_formatted",
    key: "transaction_date_formatted",
  },
  {
    title: "الإجراء",
    dataIndex: "action",
    key: "action",
  },
];
