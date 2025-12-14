import type { PaginatedResponse } from "@shared/model/shared.model";
import type {
  ServiceProviders,
  ServiceProvidersListFilterQuery,
} from "./serviceProviders.model";
import { transformFilterParams } from "@shared/services/sharedService";
import AoiService from "@shared/services/api";

export const getServiceProviders = async (
  params?: ServiceProvidersListFilterQuery
) => {
  return AoiService.get<PaginatedResponse<ServiceProviders>>(
    "/admin/providers",
    transformFilterParams(params)
  );
};
export const getServiceProvidersFields = async () =>
  AoiService.get("/provider/fields");
