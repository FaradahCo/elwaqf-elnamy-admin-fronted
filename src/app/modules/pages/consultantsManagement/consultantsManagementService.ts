import AoiService from "@shared/services/api";
import type {
  ConsultantItem,
  ConsultantsListParams,
  UpdateConsultantStatusPayload,
} from "./model/consultantsManagementModel";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { transformFilterParams } from "@shared/services/sharedService";

export const getConsultantsManagement = async (
  params?: ConsultantsListParams
) => {
  return AoiService.get<PaginatedResponse<ConsultantItem>>(
    "/admin/providers",
    transformFilterParams(params)
  );
};

export const updateConsultantStatus = async (
  payload: UpdateConsultantStatusPayload
) => {
  return AoiService.patch<UpdateConsultantStatusPayload, ConsultantItem>(
    `admin/providers/consultant`,
    payload
  );
};
