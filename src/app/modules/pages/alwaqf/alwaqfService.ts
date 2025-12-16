import type { PaginatedResponse } from "@shared/model/shared.model";
import { transformFilterParams } from "@shared/services/sharedService";
import type {
  Alwaqf,
  AlwaqfFilterQuery,
  AlwaqfStatusResponse,
} from "./alwaqfModel";
import AoiService from "@shared/services/api";

export const getAlwaqfList = async (params: AlwaqfFilterQuery) => {
  return AoiService.get<PaginatedResponse<Alwaqf>>(
    "/admin/clients",
    transformFilterParams(params)
  );
};

export const getAlWaqfStatus = async () => {
  return await AoiService.get<AlwaqfStatusResponse>(
    `/admin/clients/status-counts`
  );
};
