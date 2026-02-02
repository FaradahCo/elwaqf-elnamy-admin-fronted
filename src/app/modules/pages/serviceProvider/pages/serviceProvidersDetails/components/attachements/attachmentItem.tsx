import type { Media } from "@/app/modules/pages/consultantsManagement/model/consultantsManagementModel";
import { handleDownloadAttachment } from "@shared/services/sharedService";
import { Spin } from "antd";
import { useState } from "react";

const AttachmentItem = ({
  media,
  label,
}: {
  media: Media | null;
  label: string;
}) => {
  const [loading, setLoading] = useState(false);

  if (!media?.url) {
    return (
      <div className="flex items-center gap-2 border border-gray-200 rounded-md p-2 bg-gray-50 text-gray-500">
        <img src="/images/pdf.svg" alt="pdf" className="w-5 h-5 opacity-50" />
        <span>غير مرفق</span>
      </div>
    );
  }
  const displayName = media.name || label;
  const isPdf = media.mime_type?.includes("pdf");

  const onDownload = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await handleDownloadAttachment(media.url!);
    } finally {
      setLoading(false);
    }
  };

  return (
    <p
      onClick={onDownload}
      className={`flex items-center gap-2 border border-gray-200 rounded-md p-2 bg-gray-50 transition-colors no-underline text-inherit min-h-[40px] ${
        loading ? "cursor-wait opacity-70" : "cursor-pointer hover:bg-gray-100"
      }`}
    >
      {loading ? (
        <Spin size="small" />
      ) : (
        <img
          src={isPdf ? "/images/pdf.svg" : "/images/upload.svg"}
          alt=""
          className="w-5 h-5 shrink-0"
        />
      )}
      <span className="truncate" title={displayName}>
        {displayName}
      </span>
    </p>
  );
};

AttachmentItem.displayName = "AttachmentItem";
export default AttachmentItem;
