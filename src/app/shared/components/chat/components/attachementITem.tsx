import type React from "react";
import type { Attachement } from "../chat.model";
import { handleDownloadAttachment } from "@shared/services/sharedService";

const Attacheemnt: React.FC<{ attachment: Attachement }> = ({ attachment }) => {
  const handleClick = () => {
    if (attachment.url) {
      handleDownloadAttachment(attachment.url);
    }
  };

  return (
    <div className="mb-2">
      {attachment.type === "image" ? (
        <img
          src={attachment.url}
          alt="attachment"
          className="max-w-full h-auto rounded cursor-pointer"
          onClick={handleClick}
        />
      ) : (
        <div
          onClick={handleClick}
          className="block bg-gray-200 p-2 rounded hover:bg-gray-300 transition-colors cursor-pointer"
        >
          <p className="text-xs">{attachment.url?.split("/").pop()}</p>
          <p className="text-xs text-gray-500">
            {attachment.type} • {attachment.size ? `${attachment.size} KB` : ""}
          </p>
        </div>
      )}
    </div>
  );
};
export default Attacheemnt;
