import type { ServiceData } from "../../model/serviceProviderList";

export const serviceLogColumns = [
  {
    title: "الاجراء",
    dataIndex: "service",
    key: "title",
    render: (service: ServiceData) => service?.title || "-",
  },
  {
    title: "التاريخ",
    dataIndex: "created_at",
    key: "created_at",
    render: (created_at: string) => {
      const formattedDate = new Date(created_at).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      return formattedDate;
    },
  },
  {
    title: "التفاصيل",
    dataIndex: "service",
    key: "description",
    render: (service: ServiceData) => service?.description || "-",
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
