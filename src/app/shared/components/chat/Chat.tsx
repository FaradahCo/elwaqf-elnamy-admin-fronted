import { Spin, Tabs, message } from "antd";
import "dayjs/locale/ar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { Attachement, ChatModel, ChatResponse } from "./chat.model";
import { filterchat, sendMessage, showChat } from "./chatService";
import ChatHeader, { type ChatHeaderUser } from "./components/ChatHeader";
import ChatMessageItem from "./components/ChatMessageItem";
import MessageInput, { type MessageInputRef } from "./components/MessageInput";
import FilteredMessageItem from "./components/FilteredMessageItem";
import { useApiQuery, useMultipartMutation } from "../../services/api";
import type { RootState } from "../../../store";
type Role = "provider" | "client" | "admin";
const Chat = ({
  chat_id,
  role,
  user,
  className,
  chatMessageType,
}: {
  chat_id: number;
  role: Role;
  user: ChatHeaderUser;
  className?: string;
  chatMessageType?: string;
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const messageInputRef = useRef<MessageInputRef>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const currentUser = useSelector((state: RootState) => state.user.user);

  const tabs = [
    { id: "photos", label: "الصور", type: "image" as const },
    { id: "documents", label: "المستندات", type: "document" as const },
    { id: "links", label: "الروابط", type: "link" as const },
  ];

  // Auto-scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  // Single filtered messages query that changes based on activeTab
  const {
    data: chatResponse,
    refetch: refetchFilteredMessages,
    isLoading: isLoadingMessages,
  } = useApiQuery<ChatModel>(
    ["messages-filtered", chat_id, activeTab, role],
    () => {
      const filterType = tabs.find((tab) => tab.id === activeTab)?.type;
      return filterType
        ? filterchat(role, chat_id, {
            type: filterType,
          })
        : showChat(role, chat_id);
    },
    {
      retry: false,
      enabled: !!chat_id,
    },
  );

  // Refetch function
  const refetchMessages = useCallback(() => {
    refetchFilteredMessages();
  }, [refetchFilteredMessages]);

  // Send message mutation
  const sendMessageMutation = useMultipartMutation(
    (formData: FormData) => sendMessage(role, formData),
    {
      onSuccess: () => {
        messageInputRef.current?.clearInput();
        refetchMessages();
      },
    },
  );

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key);
  }, []);

  const handleSendMessage = useCallback(
    async (messageText: string, selectedFiles: File[]) => {
      if (!messageText.trim() && selectedFiles.length === 0) {
        message.warning("يرجى إدخال رسالة أو اختيار ملف");
        return;
      }

      try {
        // Create FormData for multipart request
        const formData = new FormData();
        formData.append("chat_id", chat_id.toString());

        if (messageText.trim()) {
          formData.append("body", messageText.trim());
        }

        // Append multiple files
        selectedFiles.forEach((file, index) => {
          formData.append(`attachments[${index}]`, file);
        });

        await sendMessageMutation.mutateAsync(formData);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [chat_id, sendMessageMutation, refetchMessages],
  );

  useEffect(() => {
    if (
      (chatResponse as Attachement[])?.length > 0 ||
      (chatResponse as ChatResponse)?.sections?.length! > 0
    ) {
      scrollToBottom();
    }
  }, [chatResponse, scrollToBottom]);

  return (
    <div className={`bg-white shadow p-4 mt-3 ${className}`}>
      {/* Header Section */}
      <div>
        <ChatHeader user={user} chatMessageType={chatMessageType} />

        {/* Chat Messages Area */}
        <div
          ref={messagesContainerRef}
          className="max-h-150 overflow-y-auto px-4 space-y-4 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* Navigation Tabs - Fixed at top */}
          <div className="sticky top-0 z-10 bg-white pb-2 -mt-4 -mx-4 px-4 pt-4 flex justify-center">
            <Tabs
              key={activeTab}
              activeKey={activeTab !== "all" ? activeTab : ""}
              onChange={handleTabChange}
              items={tabs.map((tab) => ({
                key: tab.id,
                label: tab.label,
              }))}
              size="small"
            />
          </div>

          <div className="min-h-30">
            {/* Loading Spinner */}
            {isLoadingMessages && (
              <div className="flex justify-center py-8">
                <Spin size="large" />
              </div>
            )}

            {/* Messages by Sections  regular for all tab*/}
            {!isLoadingMessages &&
              activeTab === "all" &&
              (chatResponse as ChatResponse)?.sections?.map(
                (section, index) => (
                  <div key={index}>
                    {/* Date Separator for each section */}
                    <div className="flex justify-center my-4">
                      <div className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                        {section.label}
                      </div>
                    </div>
                    {section.items ? (
                      section.items?.map((msg) => {
                        // Handle regular chat messages
                        return (
                          <ChatMessageItem
                            key={msg?.id}
                            message={msg}
                            currentRole={role}
                          />
                        );
                      })
                    ) : (
                      <>لا يوجد رسائل</>
                    )}
                  </div>
                ),
              )}

            {!isLoadingMessages &&
              activeTab !== "all" &&
              (chatResponse as Attachement[])?.map((msg, index) => (
                <FilteredMessageItem message={msg} key={index} />
              ))}
          </div>
        </div>
      </div>

      <MessageInput
        ref={messageInputRef}
        onSendMessage={handleSendMessage}
        currentUser={currentUser}
        isSending={sendMessageMutation.isPending}
        onInputFocus={() => setActiveTab("all")}
      />
    </div>
  );
};

export default React.memo(Chat);
