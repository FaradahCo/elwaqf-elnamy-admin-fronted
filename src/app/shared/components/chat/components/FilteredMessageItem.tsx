import React, { useCallback } from "react";
import type { Attachement } from "../chat.model";
import { Button } from "antd";
import { useDownloadAttachment } from "@/app/hooks/useDownloadAttachment";

interface FilteredMessageItemProps {
  message: Attachement;
}

const FilteredMessageItem: React.FC<FilteredMessageItemProps> = ({
  message,
}) => {
  const { handleDownloadAttachment, isLoading } = useDownloadAttachment();
  const getFileIcon = useCallback((type: string) => {
    switch (type) {
      case "document":
        return (
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <span className="text-red-600 text-lg">📄</span>
          </div>
        );
      case "image":
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-lg">🖼️</span>
          </div>
        );
      case "links":
        return (
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-green-600 text-lg">🔗</span>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-600 text-lg">📎</span>
          </div>
        );
    }
  }, []);

  const getActionButton = useCallback(
    (type: string, url?: string) => {
      if (!url) return null;

      switch (type) {
        case "document":
          return (
            <Button
              loading={isLoading}
              disabled={isLoading}
              onClick={() => handleDownloadAttachment(url)}
              className="inline-flex! items-center! px-3! py-1.5! border! border-transparent! text-xs! font-medium! rounded-md! text-white! bg-red-600! hover:bg-red-700! focus:outline-none! focus:ring-2! focus:ring-offset-2! focus:ring-red-500!"
            >
              فتح
            </Button>
          );
        case "image":
          return (
            <Button
              loading={isLoading}
              disabled={isLoading}
              onClick={() => handleDownloadAttachment(url)}
              className="inline-flex! items-center! px-3! py-1.5! border! border-transparent! text-xs! font-medium! rounded-md! text-white! bg-blue-600! hover:bg-blue-700! focus:outline-none! focus:ring-2! focus:ring-offset-2! focus:ring-blue-500!"
            >
              فتح
            </Button>
          );

        case "link":
          return (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-2"
            >
              فتح الرابط
            </a>
          );
        default:
          return null;
      }
    },
    [handleDownloadAttachment],
  );

  return (
    <div className="flex justify-start">
      <div className="bg-white border border-gray-200 rounded-lg p-4 w-full mb-3">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            {getFileIcon(message?.mime_type?.split("/")[0]!)}
          </div>
          <Button
            type="link"
            disabled={isLoading}
            loading={isLoading}
            className="block! h-auto! p-0! flex-1! min-w-0! cursor-pointer!"
            onClick={() => {
              if (message?.type === "link" && message?.url) {
                window.open(message.url, "_blank", "noopener,noreferrer");
              } else if (message?.url && message?.type !== "link") {
                handleDownloadAttachment(message.url);
              }
            }}
          >
            <p className="text-sm font-medium text-gray-900 truncate hover:text-blue-600">
              {message.url?.split("/").pop()}
            </p>
            <p className="text-xs text-gray-500">
              {message.mime_type} • {message.size} KB
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {message?.created_time}
            </p>
          </Button>
          <div className="shrink-0">
            {getActionButton(message?.type!, message?.url)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredMessageItem;
