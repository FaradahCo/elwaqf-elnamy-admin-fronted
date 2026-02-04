import type {
  PaginatedResponse,
  ServiceStatus,
} from "@shared/model/shared.model";
import { useApiQuery } from "@shared/services/api";
import { getSerivceStatus } from "@shared/services/sharedService";

export const useServiceStatus = (type: string) => {
  const { data: serviceStatus, isLoading } = useApiQuery<
    PaginatedResponse<ServiceStatus>
  >(
    ["serviceStatus", type],
    () => getSerivceStatus({ type: type ?? "service" }),
    {
      enabled: !!type,
    },
  );

  return { serviceStatus, isLoading };
};
