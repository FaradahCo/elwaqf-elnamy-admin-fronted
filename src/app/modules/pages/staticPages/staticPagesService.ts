import AoiService from "@shared/services/api";
import type {
  StaticPageItem,
  StaticPagesListParams,
} from "./model/staticPagesModel";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { transformFilterParams } from "@shared/services/sharedService";

export const getStaticPages = async (params?: StaticPagesListParams) => {
  return AoiService.get<PaginatedResponse<StaticPageItem>>(
    "/admin/pages",
    transformFilterParams(params)
  );
};

export const getStaticPageById = async (id: number) => {
  return AoiService.get<StaticPageItem>(`/admin/pages/${id}`);
};

export const createStaticPage = async (data: StaticPageItem) => {
  return AoiService.post<StaticPageItem, StaticPageItem>("/admin/pages", data);
};

export const updateStaticPage = async (id: number, data: StaticPageItem) => {
  const response = await AoiService.patch<StaticPageItem, StaticPageItem>(
    `/admin/pages/${id}`,
    data
  );
  return response.data;
};

export const deleteStaticPage = async (id: number) => {
  return AoiService.delete(`/admin/pages/${id}`);
};
