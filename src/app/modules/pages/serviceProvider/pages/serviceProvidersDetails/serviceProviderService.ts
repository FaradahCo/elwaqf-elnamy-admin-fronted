import AoiService from "@shared/services/api";

export const GetProviderData = (id: number) => {
  return AoiService.get(`/admin/providers/${id}`);
};
