import AoiService from "@shared/services/api";
import type { Provider } from "../../../followRequests/model/followRequestsModel";

export const GetProviderData = (id: number) => {
  return AoiService.get<Provider>(`/admin/providers/${id}`);
};
