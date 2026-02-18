import { useApiQuery } from "@shared/services/api";
import { getFollowRequestseStatus } from "../modules/pages/followRequests/followRequestsService";

export const useRequestsStatus = () => {
  const { data: requestsStatus, isLoading } = useApiQuery(
    ["requestsStatus"],
    getFollowRequestseStatus,
    { retry: false },
  );

  return {
    requestsStatus,
    isLoading,
  };
};
