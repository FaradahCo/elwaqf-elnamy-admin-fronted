import { Avatar } from "antd";
import React from "react";

export type ChatHeaderUser = {
  name: string;
  image?: string;
  business_name?: string;
};

interface ChatHeaderProps {
  user: ChatHeaderUser;
  chatMessageType?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user, chatMessageType }) => {
  return (
    <div className="border-b border-gray-200">
      {/* Profile Information */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar size={60} src={user?.image ?? "/images/user.png"} className="bg-second-primary" />
        <div>
          <h2 className="text-second-primary text-md font-bold mb-2">{user?.name}</h2>
          <p className="text-gray-600 text-xs">{chatMessageType ?? user?.business_name}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
