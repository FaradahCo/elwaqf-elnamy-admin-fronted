import { removeNullValues } from "@shared/services/sharedService";
import { type UseQueryOptions } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useSearchParams } from "react-router";
import { useApiQuery } from "../shared/services/api";

export interface UseListHookOptions<TData, TFilterQuery> {
  queryKey: string;
  fetchFn: (filter: TFilterQuery) => Promise<TData>;
  initialFilter?: TFilterQuery;
  enabled?: boolean;
  queryOptions?: Omit<UseQueryOptions<TData, Error>, "queryKey" | "queryFn">;
}

export interface UseListHookReturn<TData, TFilterQuery> {
  data: TData | undefined;
  isLoading: boolean;
  filter: TFilterQuery;
  handleFilterChange: (filterValues: TFilterQuery) => void;
  handlePaginationChange: (page: number, per_page: number) => void;
}

const parseSearchParamsToFilter = (
  searchParams: URLSearchParams,
): Record<string, string> => {
  const result: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (value !== undefined && value !== null && value !== "") {
      result[key] = value;
    }
  });
  return result;
};

export const useListHook = <TData, TFilterQuery>(
  options: UseListHookOptions<TData, TFilterQuery>,
): UseListHookReturn<TData, TFilterQuery> => {
  const {
    queryKey,
    fetchFn,
    initialFilter,
    enabled = true,
    queryOptions = {},
  } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState<TFilterQuery>(() => {
    const urlFilter = parseSearchParamsToFilter(searchParams);
    return {
      sort: "-created_at",
      page: 1,
      per_page: 10,
      ...initialFilter,
      ...urlFilter,
    } as TFilterQuery;
  });

  const { data, isLoading } = useApiQuery<TData, Error>(
    [queryKey, filter],
    () => fetchFn(filter),
    {
      enabled: enabled && !!filter,
      ...queryOptions,
    },
  );

  const handleFilterChange = useCallback(
    (filterValues: TFilterQuery) => {
      setFilter((prevFilter) => {
        const updated = { ...prevFilter, ...filterValues } as TFilterQuery;
        setSearchParams(
          new URLSearchParams(
            removeNullValues(updated as Record<string, unknown>),
          ),
        );
        return updated;
      });
    },
    [setSearchParams],
  );

  const handlePaginationChange = useCallback(
    (page: number, per_page: number) => {
      setFilter((prevFilter) => {
        const updated = { ...prevFilter, page, per_page } as TFilterQuery;
        setSearchParams(
          new URLSearchParams(
            removeNullValues(updated as Record<string, unknown>),
          ),
        );
        return updated;
      });
    },
    [setSearchParams],
  );

  return {
    data,
    isLoading,
    filter,
    handleFilterChange,
    handlePaginationChange,
  };
};
