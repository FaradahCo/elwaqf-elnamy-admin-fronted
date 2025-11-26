import AoiService from "@shared/services/api";
import type {
  ConsultantItem,
  ConsultantsListParams,
} from "./model/consultantsManagementModel";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { transformFilterParams } from "@shared/services/sharedService";

export const getConsultants = async (params?: ConsultantsListParams) => {
  return AoiService.get<PaginatedResponse<ConsultantItem>>(
    "/admin/consultants",
    transformFilterParams(params)
  );
};

export const getConsultant = async (consultantId: string) => {
  return AoiService.get<ConsultantItem>(`/admin/consultants/${consultantId}`);
};

export const createConsultant = async (data: ConsultantItem) => {
  return await AoiService.post<ConsultantItem, ConsultantItem>(
    "/admin/consultants",
    data
  );
};

export const updateConsultant = async (
  id: number,
  data: Partial<ConsultantItem>
) => {
  return await AoiService.patch<Partial<ConsultantItem>, ConsultantItem>(
    `/admin/consultants/${id}`,
    data
  );
};

export const deleteConsultant = async (id: number) => {
  return AoiService.delete(`/admin/consultants/${id}`);
};

