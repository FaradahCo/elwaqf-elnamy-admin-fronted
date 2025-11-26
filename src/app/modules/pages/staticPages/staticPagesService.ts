import AoiService from "@shared/services/api";
import type {
  StaticPageItem,
  StaticPagesListParams,
} from "./model/staticPagesModel";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { transformFilterParams } from "@shared/services/sharedService";

export const getStaticPages = async (params?: StaticPagesListParams) => {
  return AoiService.get<PaginatedResponse<StaticPageItem>>(
    "/admin/static-pages",
    transformFilterParams(params)
  );
};

export const getStaticPage = async (staticPageId: string) => {
  return AoiService.get<StaticPageItem>(`/admin/static-pages/${staticPageId}`);
};

export const createStaticPage = async (data: StaticPageItem) => {
  return await AoiService.post<StaticPageItem, StaticPageItem>(
    "/admin/static-pages",
    data
  );
};

export const updateStaticPage = async (
  id: number,
  data: Partial<StaticPageItem>
) => {
  return await AoiService.patch<Partial<StaticPageItem>, StaticPageItem>(
    `/admin/static-pages/${id}`,
    data
  );
};

export const deleteStaticPage = async (id: number) => {
  return AoiService.delete(`/admin/static-pages/${id}`);
};

