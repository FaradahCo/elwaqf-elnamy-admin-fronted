import AoiService from "@shared/services/api";
import type {
  DiscoundCodeItem,
  DiscoundListParams,
} from "./model/discoundCodesModel";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { transformFilterParams } from "@shared/services/sharedService";

export const DiscoundCodes = async (params?: DiscoundListParams) => {
  return AoiService.get<PaginatedResponse<DiscoundCodeItem>>(
    "/admin/discount-codes",
    transformFilterParams(params)
  );
};

export const CreateDiscoundCode = async (data: DiscoundCodeItem) => {
  return await AoiService.post<DiscoundCodeItem, DiscoundCodeItem>(
    "/admin/discount-codes",
    data
  );
};

export const UpdateDiscoundCode = async (
  id: number,
  data: DiscoundCodeItem
) => {
  return await AoiService.patch<DiscoundCodeItem, DiscoundCodeItem>(
    `/admin/discount-codes/${id}`,
    data
  );
};

export const DeleteDiscoundCode = async (id: number) => {
  return AoiService.delete(`/admin/discount-codes/${id}`);
};

export const GetDiscoundCode = async (id: string) => {
  return await AoiService.get<DiscoundCodeItem>(`/admin/discount-codes/${id}`);
};
