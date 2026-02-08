import type { PaginatedResponse } from "@shared/model/shared.model";
import type {
  ProviderDashboard,
  ServiceItem,
  ServiceProviders,
  ServiceProvidersListFilterQuery,
  serviceProvidersStatus,
  serviceProvidersStatusResponse,
  Wallet,
} from "./serviceProviders.model";
import { transformFilterParams } from "@shared/services/sharedService";
import AoiService from "@shared/services/api";
import type { Provider } from "../followRequests/model/followRequestsModel";
import type {
  Consultation,
  Invoice,
  ServiceRequest,
} from "../alwaqf/alwaqfModel";
import type { WithdrawItem } from "../wallet/wallet.model";

export const getServiceProviders = async (
  params?: ServiceProvidersListFilterQuery,
) => {
  return AoiService.get<PaginatedResponse<ServiceProviders>>(
    "/admin/providers",
    transformFilterParams(params),
  );
};

export const getSeriviceProvidersStatus = async () =>
  await AoiService.get<serviceProvidersStatusResponse>(
    `/admin/providers/status-counts`,
  );

export const getProviderData = (id: number) => {
  return AoiService.get<Provider>(`/admin/providers/${id}`);
};
export const getProviderWallet = (id: number) => {
  return AoiService.get<Wallet>(`/admin/providers/${id}/wallet`);
};
export const getProviderDashboard = (id: number) => {
  return AoiService.get<ProviderDashboard>(`/admin/providers/${id}/dashboard`);
};
export const getProviderServices = (
  id: number,
  params: ServiceProvidersListFilterQuery,
) => {
  return AoiService.get<PaginatedResponse<ServiceItem>>(
    `/admin/providers/${id}/services`,
    transformFilterParams(params),
  );
};
export const getProviderRequests = (
  id: number,
  params: ServiceProvidersListFilterQuery,
) => {
  return AoiService.get<PaginatedResponse<ServiceRequest>>(
    `/admin/providers/${id}/service-requests`,
    transformFilterParams(params),
  );
};
export const getProviderConsultations = (
  id: number,
  params: ServiceProvidersListFilterQuery,
) => {
  return AoiService.get<PaginatedResponse<Consultation>>(
    `/admin/providers/${id}/consultations`,
    transformFilterParams(params),
  );
};
export const getProviderWithdrawals = (
  id: number,
  params: ServiceProvidersListFilterQuery,
) => {
  return AoiService.get<PaginatedResponse<WithdrawItem>>(
    `/admin/providers/${id}/withdrawals`,
    transformFilterParams(params),
  );
};
export const getProviderInvoices = (
  id: number,
  params: ServiceProvidersListFilterQuery,
) => {
  return AoiService.get<PaginatedResponse<Invoice>>(
    `/admin/providers/${id}/invoices`,
    transformFilterParams(params),
  );
};

export const updateServiceProviderStatus = async (
  id: number,
  data: Partial<serviceProvidersStatus>,
) => {
  return AoiService.patch<Partial<serviceProvidersStatus>, unknown>(
    `admin/providers/${id}/update`,
    data,
  );
};
