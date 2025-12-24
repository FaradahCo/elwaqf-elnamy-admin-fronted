import { useState, useCallback } from "react";
import { useApiQuery } from "../shared/services/api";
import { keepPreviousData, type UseQueryOptions } from "@tanstack/react-query";

export interface UseListHookOptions<TData, TFilterQuery> {
  queryKey: string;
  fetchFn: (filter: TFilterQuery) => Promise<TData>;
  initialFilter: TFilterQuery;
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

export const useListHook = <TData, TFilterQuery>(
  options: UseListHookOptions<TData, TFilterQuery>
): UseListHookReturn<TData, TFilterQuery> => {
  const {
    queryKey,
    fetchFn,
    initialFilter,
    enabled = true,
    queryOptions = {},
  } = options;

  const [filter, setFilter] = useState<TFilterQuery>(initialFilter);

  const { data, isLoading } = useApiQuery<TData, Error>(
    [queryKey, filter],
    () => fetchFn(filter),
    {
      enabled: enabled && !!filter,
      placeholderData: keepPreviousData,
      ...queryOptions,
    }
  );

  const handleFilterChange = useCallback((filterValues: TFilterQuery) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...filterValues,
    }));
  }, []);

  const handlePaginationChange = useCallback(
    (page: number, per_page: number) => {
      setFilter(
        (prevFilter) =>
          ({
            ...prevFilter,
            page,
            per_page,
          } as TFilterQuery)
      );
    },
    []
  );

  return {
    data,
    isLoading,
    filter,
    handleFilterChange,
    handlePaginationChange,
  };
};
