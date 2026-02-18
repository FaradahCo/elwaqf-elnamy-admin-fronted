import { useDownloadAttachment } from "@/app/hooks/useDownloadAttachment";
import type { Media } from "@/app/modules/pages/consultantsManagement/model/consultantsManagementModel";
import { Spin } from "antd";

const AttachmentItem = ({
  media,
  label,
}: {
  media: Media | null;
  label: string;
}) => {
  const { handleDownloadAttachment, isLoading } = useDownloadAttachment();

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

  return (
    <p
      onClick={() => handleDownloadAttachment(media.url!)}
      className={`flex items-center gap-2 border border-gray-200 rounded-md p-2 bg-gray-50 transition-colors no-underline text-inherit min-h-[40px] ${
        isLoading
          ? "cursor-wait opacity-70"
          : "cursor-pointer hover:bg-gray-100"
      }`}
    >
      {isLoading ? (
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
