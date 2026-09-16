import { Button, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  ServiceStatusEnum,
  getStatusTag,
} from "@shared/services/sharedService";
import type { Deliverables, FileType } from "../../model/followRequestsModel";

export const serviceOutputsColumns = (
  handleDownloadAttachment: (url: string) => void,
  isLoading: boolean,
): ColumnsType<Deliverables> => [
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
    render: (files: FileType[] | undefined) => {
      if (!files?.length) return "-";

      return (
        <>
          {files.map((file) => (
            <Button
              key={file.id ?? file.uuid}
              type="link"
              disabled={isLoading || !file.url}
              loading={isLoading}
              onClick={() => {
                if (!file.url) return;
                void handleDownloadAttachment(file.url);
              }}
            >
              <img src="/images/attach 1.svg" alt="file" className="w-4 h-4" />
              <span className="text-sm text-primary cursor-pointer underline hover:text-second-primary">
                {file.name}
              </span>
            </Button>
          ))}
        </>
      );
    },
  },
  {
    title: "حالة للمخرج",
    dataIndex: "status",
    key: "status",
    render: (status: ServiceStatusEnum, item: Deliverables) => {
      const statusInfo = getStatusTag(status);
      return (
        <Tag color={statusInfo?.color || "blue"}>
          {item.status_label || "جاري العمل"}
        </Tag>
      );
    },
  },
];
