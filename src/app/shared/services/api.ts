import type {
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance, { type ApiResponse } from "../../../interceptor";

const AoiService = {
  get: async <TResponse>(url: string, params?: any): Promise<TResponse> => {
    const res = await axiosInstance.get<TResponse>(url, {
      params: params,
      paramsSerializer: {
        indexes: null,
      },
    });
    return res.data as TResponse;
  },

  post: async <TInput, TResponse>(
    url: string,
    data?: TInput
  ): Promise<TResponse> => {
    const res = await axiosInstance.post<TResponse>(url, data);
    return res.data;
  },

  patch: async <TInput, TResponse>(
    url: string,
    data?: TInput
  ): Promise<ApiResponse<TResponse>> => {
    const res = await axiosInstance.patch<ApiResponse<TResponse>>(url, data);
    return res.data;
  },

  put: async <TInput, TResponse>(
    url: string,
    data?: TInput
  ): Promise<TResponse> => {
    const res = await axiosInstance.put<TResponse>(url, data);
    return res.data;
  },

  delete: async (url: string) => {
    const res = await axiosInstance.delete(url);
    return res.data;
  },
};

export function useApiMutation<TPayload, TResponse>(
  mutationFn: (payload: TPayload) => Promise<TResponse>,
  options?: UseMutationOptions<TResponse, Error, TPayload>
): UseMutationResult<TResponse, Error, TPayload> {
  return useMutation<TResponse, Error, TPayload>({
    mutationFn,
    ...options,
  });
}

// Shared query hook for GET requests with loader integration
export function useApiQuery<TData, TError = Error>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  });
}

export default AoiService;
