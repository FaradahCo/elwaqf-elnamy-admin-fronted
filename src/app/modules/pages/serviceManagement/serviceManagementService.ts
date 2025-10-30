import AoiService from "@shared/services/api";
import type {
  Field,
  ServiceData,
  ServiceManagementQuery,
  ServiceRevision,
} from "./model/serviceProviderList";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { transformFilterParams } from "@shared/services/sharedService";

export const getServices = async (params?: ServiceManagementQuery) => {
  return AoiService.get<PaginatedResponse<ServiceData>>(
    "admin/services",
    transformFilterParams(params)
  );
};

export const getService = async (serviceId: string) => {
  return AoiService.get<ServiceData>(`/admin/services/${serviceId}`);
};

export const getFields = async () => {
  return AoiService.get<Field[]>(`/provider/fields`);
};

export const approveServiceRevision = async (serviceId: string) => {
  return AoiService.post<unknown, unknown>(
    `/admin/revisions/${serviceId}/approve`
  );
};

export const rejectServiceRevision = async (
  serviceId: string,
  data: { reason: string }
) => {
  return AoiService.post<{ reason: string }, unknown>(
    `/admin/revisions/${serviceId}/refuse`,
    data
  );
};

export const getRevisionsByServiceId = async (params: any) => {
  return AoiService.get<PaginatedResponse<ServiceRevision[]>>(
    `admin/revisions`,
    transformFilterParams(params)
  );
};

export const updateService = async (
  serviceId: string,
  data: Partial<ServiceData>
) => {
  return AoiService.put<Partial<ServiceData>, ServiceData>(
    `admin/services/${serviceId}`,
    data
  );
};
