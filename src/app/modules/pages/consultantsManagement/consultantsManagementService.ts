import AoiService from "@shared/services/api";
import type {
  ConsultantItem,
  ConsultantsListParams,
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
  team_id: number,
  payload: { status: string }
) => {
  return AoiService.patch<{ status: string }, ConsultantItem>(
    `/admin/providers/${team_id}/update`,
    payload
  );
};
