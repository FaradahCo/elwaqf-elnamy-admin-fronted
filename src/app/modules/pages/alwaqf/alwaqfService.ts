import type { PaginatedResponse } from "@shared/model/shared.model";
import { transformFilterParams } from "@shared/services/sharedService";
import type {
  Alwaqf,
  AlwaqfFilterQuery,
  AlwaqfStatusResponse,
  Client,
} from "./alwaqfModel";
import AoiService from "@shared/services/api";

export const getAlwaqfList = async (params: AlwaqfFilterQuery) => {
  return AoiService.get<PaginatedResponse<Alwaqf>>(
    "/admin/clients",
    transformFilterParams(params),
  );
};

export const getAlWaqfStatus = async () => {
  return AoiService.get<AlwaqfStatusResponse>(`/admin/clients/status-counts`);
};
export const getAlWaqfDetails = async (id: number) => {
  return AoiService.get<Client>(`/admin/clients/${id}`);
};
