import type { Role, TimelineMessageItem } from "../../chat.model";
import ChatMessageItem from "../ChatMessageItem";

interface MessageItemProps {
  item: TimelineMessageItem;
  role: Role;
}

const MessageItem = ({ item, role }: MessageItemProps) => {
  return (
    <ChatMessageItem
      message={{
        id: item.id,
        body: item.body,
        created_at: item.created_at ?? "",
        read_at: item.read_at ?? "",
        sender: item.sender,
        attachments: item.attachments,
        created_time: item.created_time,
      }}
      currentRole={role}
    />
  );
};

export default MessageItem;
