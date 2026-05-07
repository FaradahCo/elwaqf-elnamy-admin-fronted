import AoiService from "@shared/services/api";
import { transformFilterParams } from "@shared/services/sharedService";
import type {
  FollowRequest,
  FollowRequestFilterQuery,
  FollowRequestStatusResponse,
  PreviewQuotationPayload,
  PreviewQuotationsAfterSendQouationsPayload,
} from "./model/followRequestsModel";
import type { PaginatedResponse } from "@shared/model/shared.model";

export const getServiceRequests = async (params: FollowRequestFilterQuery) => {
  return AoiService.get<PaginatedResponse<FollowRequest>>(
    "/admin/service-requests",
    transformFilterParams(params),
  );
};

export const getServiceRequestById = async (id: string) => {
  return AoiService.get<FollowRequest>(`/admin/service-requests/${id}`);
};

export const getFollowRequestseStatus = async () => {
  return await AoiService.get<FollowRequestStatusResponse>(
    `/admin/service-requests/status-counts`,
  );
};

export const previewQuotation = async (payload: PreviewQuotationPayload) => {
  return AoiService.postBlob<typeof payload>("/admin/quotations/preview", {
    ...payload,
  });
};

export const previewQuotationsAfterSendQouations = (
  payload: PreviewQuotationsAfterSendQouationsPayload,
) => {
  return AoiService.postBlob<typeof payload>("/admin/quotations/print", {
    ...payload,
  });
};
