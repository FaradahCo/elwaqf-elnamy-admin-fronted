import AoiService from "@shared/services/api";
import { transformFilterParams } from "@shared/services/sharedService";
import type {
  FollowRequest,
  FollowRequestFilterQuery,
  FollowRequestStatusResponse,
} from "./model/followRequestsModel";
import type { PaginatedResponse } from "@shared/model/shared.model";

export const getServiceRequests = async (params: FollowRequestFilterQuery) => {
  return AoiService.get<PaginatedResponse<FollowRequest>>(
    "/admin/service-requests",
    transformFilterParams(params)
  );
};
export const getFollowRequestseStatus = async () => {
  return await AoiService.get<FollowRequestStatusResponse>(
    `/admin/service-requests/status-counts`
  );
};
