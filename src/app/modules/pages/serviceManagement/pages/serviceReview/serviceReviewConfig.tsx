
export const serviceLogColumns = [
  {
    title: "الاجراء",
    dataIndex: "action_summary",
    key: "action_summary",
  },
  {
    title: "الحقول المعدلة",
    dataIndex: "changed_fields",
    key: "changed_fields",
    render: (value: string[]) => value?.join(", ") || "-",
  },
  {
    title: "التاريخ",
    dataIndex: "updated_at",
    key: "updated_at",
  },
  {
    title: "التفاصيل",
    dataIndex: "note",
    key: "note",
    render: (note: string) => note || "-",
  },
];

export const colorMap: Record<string, string> = {
  green: "#52c41a",
  orange: "#faad14",
  blue: "#1890ff",
  red: "#f5222d",
  gray: "#8b8b8b",
  purple: "#722ed1",
  default: "#d9d9d9",
};
