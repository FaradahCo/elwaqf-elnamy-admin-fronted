import { Tag } from "antd";
import { getStatusTag } from "@shared/services/sharedService";

export const serviceOutputsColumns = [
  {
    title: "المخرج",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "تاريخ الرفع",
    dataIndex: "uploaded_at",
    key: "uploaded_at",
    render: (uploaded_at: string) => uploaded_at || "--",
  },
  {
    title: "الوثائق الداعمة",
    dataIndex: "files",
    key: "files",
    render: (files: any[]) => (files?.length ? "يوجد وثائق" : "--"),
  },
  {
    title: "حالة للمخرج",
    dataIndex: "status",
    key: "status",
    render: (status: any, item: any) => {
      const statusInfo = getStatusTag(status);
      return (
        <Tag color={statusInfo?.color || "blue"}>
          {item.status_label || "جاري العمل"}
        </Tag>
      );
    },
  },
];
