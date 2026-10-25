import React, { memo } from "react";
import { Spin } from "antd";
import { useDownloadAttachment } from "@/app/hooks/useDownloadAttachment";

export interface AttachmentCellProps {
  url?: string;
  icon?: React.ReactNode;
  text?: React.ReactNode;
}

const AttachmentCell = memo(({ url, icon, text }: AttachmentCellProps) => {
  const { handleDownloadAttachment, isLoading } = useDownloadAttachment();

  if (!url) {
    return <span>-</span>;
  }

  const displayText = text ?? (!icon ? "صوره الفاتورة" : undefined);

  return (
    <div className="flex items-center gap-2">
      {isLoading ? (
        <Spin size="small" />
      ) : (
        <span
          role="button"
          onClick={() => handleDownloadAttachment(url)}
          className={`inline-flex items-center gap-1.5 ${
            displayText
              ? "text-primary! underline!"
              : "hover:opacity-75 transition-all duration-200"
          } ${
            isLoading
              ? "cursor-wait opacity-60 pointer-events-none"
              : "cursor-pointer hover:opacity-85"
          }`}
        >
          {icon}
          {displayText && <span>{displayText}</span>}
        </span>
      )}
    </div>
  );
});

export default AttachmentCell;
