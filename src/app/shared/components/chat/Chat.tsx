import { Spin, Tabs } from "antd";
import "dayjs/locale/ar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Attachement, Role } from "./chat.model";
import { filterchat } from "./chatService";
import ChatHeader, { type ChatHeaderUser } from "./components/ChatHeader";
import FilteredMessageItem from "./components/FilteredMessageItem";
import Timeline from "./components/timeline/Timeline";
import { useChatTimeline } from "./hooks/useChatTimeline";
import { useApiQuery } from "../../services/api";

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
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const previousScrollHeightRef = useRef(0);

  const tabs = [
    { id: "all", label: "المحادثة" },
    { id: "photos", label: "الصور", type: "image" as const },
    { id: "documents", label: "المستندات", type: "document" as const },
    { id: "links", label: "الروابط", type: "link" as const },
  ];

  const {
    sections,
    isLoading: isLoadingTimeline,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useChatTimeline(role, chat_id);

  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, []);

  const scrollToBottomAfterPaint = useCallback(() => {
    requestAnimationFrame(() => {
      scrollToBottom();
      window.setTimeout(scrollToBottom, 150);
    });
  }, [scrollToBottom]);

  const {
    data: filteredAttachments = [],
    isLoading: isLoadingFilteredMessages,
  } = useApiQuery<Attachement[]>(
    ["messages-filtered", chat_id, activeTab, role],
    () => {
      const filterType = tabs.find((tab) => tab.id === activeTab)?.type;
      if (!filterType) return Promise.resolve([]);
      return filterchat(role, chat_id, { type: filterType });
    },
    {
      retry: false,
      enabled: !!chat_id && activeTab !== "all",
    },
  );

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key);
  }, []);

  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container || activeTab !== "all" || !hasNextPage || isFetchingNextPage) {
      return;
    }

    if (container.scrollTop <= 48) {
      previousScrollHeightRef.current = container.scrollHeight;
      void fetchNextPage();
    }
  }, [activeTab, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const totalItems = sections.reduce(
    (count, section) => count + section.items.length,
    0,
  );

  useEffect(() => {
    if (activeTab === "all" && totalItems > 0 && !isFetchingNextPage) {
      scrollToBottomAfterPaint();
    }
  }, [activeTab, totalItems, isFetchingNextPage, scrollToBottomAfterPaint]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || !isFetchingNextPage || previousScrollHeightRef.current <= 0) {
      return;
    }
    container.scrollTop =
      container.scrollHeight - previousScrollHeightRef.current;
  }, [sections, isFetchingNextPage]);

  const isLoadingMessages =
    activeTab === "all" ? isLoadingTimeline : isLoadingFilteredMessages;

  return (
    <div className={`bg-white shadow p-4 mt-3 ${className ?? ""}`}>
      <ChatHeader user={user} chatMessageType={chatMessageType} />

      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="max-h-150 overflow-y-auto px-4 space-y-4 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="sticky top-0 z-10 -mx-4 -mt-4 bg-white px-4 pt-4 pb-2 flex justify-center">
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            items={tabs.map((tab) => ({
              key: tab.id,
              label: tab.label,
            }))}
            size="small"
          />
        </div>

        <div className="min-h-30">
          {activeTab === "all" ? (
            <Timeline
              sections={sections}
              role={role}
              isLoading={isLoadingMessages}
              isFetchingNextPage={isFetchingNextPage}
            />
          ) : (
            <>
              {isLoadingMessages ? (
                <div className="flex justify-center py-8">
                  <Spin size="large" />
                </div>
              ) : null}

              {!isLoadingMessages &&
                filteredAttachments.map((attachment, index) => (
                  <FilteredMessageItem
                    message={attachment}
                    key={attachment.id ?? index}
                  />
                ))}

              {!isLoadingMessages && filteredAttachments.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">
                  لا يوجد محتوى
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Chat);
