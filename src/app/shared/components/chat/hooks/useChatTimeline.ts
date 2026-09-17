import {
  useInfiniteQuery,
  type InfiniteData,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { useMemo } from "react";
import type { Role, TimelineResponse, TimelineSection } from "../chat.model";
import { showChat } from "../chatService";

const TIMELINE_PER_PAGE = 30;

type TimelineQueryKey = ["chat-timeline", Role, number];

type UseChatTimelineResult = Pick<
  UseInfiniteQueryResult<InfiniteData<TimelineResponse, number>, Error>,
  | "isLoading"
  | "isFetchingNextPage"
  | "hasNextPage"
  | "fetchNextPage"
  | "refetch"
> & { sections: TimelineSection[] };

export const useChatTimeline = (
  role: Role,
  chatId?: number,
): UseChatTimelineResult => {
  const query = useInfiniteQuery<
    TimelineResponse,
    Error,
    InfiniteData<TimelineResponse, number>,
    TimelineQueryKey,
    number
  >({
    queryKey: ["chat-timeline", role, chatId ?? 0],
    queryFn: async ({ pageParam = 1 }) => {
      if (!chatId) {
        return {
          sections: [],
          pagination: {
            current_page: 1,
            last_page: 1,
            per_page: TIMELINE_PER_PAGE,
            total: 0,
          },
        };
      }

      return showChat(role, chatId, {
        page: pageParam,
        per_page: TIMELINE_PER_PAGE,
      });
    },
    initialPageParam: 1,
    enabled: !!chatId,
    retry: false,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination?.current_page ?? 1;
      const lastPageNumber = lastPage.pagination?.last_page ?? 1;

      if (currentPage < lastPageNumber) {
        return currentPage + 1;
      }

      return undefined;
    },
  });

  const sections = useMemo<TimelineSection[]>(
    () => query.data?.pages.flatMap((page) => page.sections ?? []) ?? [],
    [query.data?.pages],
  );

  return {
    sections,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    refetch: query.refetch,
  };
};
