import AoiService from "@shared/services/api";
import { transformFilterParams } from "@shared/services/sharedService";
import type {
  FollowRequest,
  FollowRequestFilterQuery,
} from "./model/followRequestsModel";
import type { PaginatedResponse } from "@shared/model/shared.model";

export const getServiceRequests = async (params: FollowRequestFilterQuery) => {
  return AoiService.get<PaginatedResponse<FollowRequest>>(
    "/admin/service-requests",
    transformFilterParams(params)
  );
};
