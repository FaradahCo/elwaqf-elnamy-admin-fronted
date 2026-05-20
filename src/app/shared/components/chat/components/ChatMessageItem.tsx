import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import type { Attachement, Message } from "../chat.model";
import FilteredMessageItem from "./FilteredMessageItem";
import { extractUrl } from "@shared/services/sharedService";

interface ChatMessageItemProps {
  message: Message | Attachement;
  currentRole?: "provider" | "client" | "admin";
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  currentRole = "provider",
}) => {
  // Otherwise, render regular chat message view
  const text = (message as Message)?.body;
  const timestamp = (message as Message)?.created_time;
  const isUser =
    (message as Message)?.sender?.type === currentRole ? true : false;
  const url = text ? extractUrl(text) : null;

  return (
    <div
      className={`flex items-end gap-2 mt-2 ${isUser ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Avatar for other user */}
      {!isUser && (
        <Avatar
          size={32}
          className="bg-second-primary shrink-0"
          icon={<UserOutlined />}
        />
      )}

      {/* Avatar for user */}
      {isUser && (
        <Avatar
          size={32}
          className="bg-gray-200 shrink-0"
          icon={<UserOutlined />}
        />
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-xs px-4 mt-3 py-2 rounded-2xl wrap-break-word ${
          isUser ? "bg-gray-200 text-gray-800" : "bg-[#D8E5C1] text-white"
        }`}
      >
        {text && (
          <p
            className={`text-sm font-medium wrap-break-word ${
              !isUser ? "text-black" : "text-black"
            }`}
          >
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {text}
              </a>
            ) : (
              text
            )}
          </p>
        )}
        {(message as Message)?.attachments &&
          (message as Message).attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {(message as Message).attachments.map((attachment, index) => (
                <FilteredMessageItem message={attachment} key={index} />
              ))}
            </div>
          )}

        <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
      </div>
    </div>
  );
};

export default ChatMessageItem;
