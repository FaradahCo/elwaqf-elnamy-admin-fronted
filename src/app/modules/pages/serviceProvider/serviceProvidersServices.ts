import type { PaginatedResponse } from "@shared/model/shared.model";
import type {
  ProviderDashboardStats,
  ProviderServiceItem,
  ProviderServiceRequest,
  ProviderWallet,
  ProviderWithdrawal,
  ServiceProviderDetails,
  ServiceProviders,
  ServiceProvidersListFilterQuery,
  serviceProvidersStatusResponse,
  ProviderConsultation,
  ProviderReview,
  ProviderInvoice,
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

export const getSeriviceProvidersStatus = async () =>
  AoiService.get<serviceProvidersStatusResponse>(
    `/admin/providers/status-counts`
  );


export const getServiceProvider = async (teamId: string) =>
  AoiService.get<ServiceProviderDetails>(`/admin/providers/${teamId}`);

export const updateServiceProviderStatus = async (
  teamId: string,
  status: string
) => AoiService.patch(`/admin/providers/${teamId}/update`, { status });

export const getServiceProviderDashboard = async (teamId: string) =>
  AoiService.get<ProviderDashboardStats>(`/admin/providers/${teamId}/dashboard`);

export const getServiceProviderRequests = async (
  teamId: string,
  params?: any
) =>
  AoiService.get<PaginatedResponse<ProviderServiceRequest>>(
    `/admin/providers/${teamId}/service-requests`,
    transformFilterParams(params)
  );

export const getServiceProviderWallet = async (teamId: string) =>
  AoiService.get<ProviderWallet>(`/admin/providers/${teamId}/wallet`);

export const getServiceProviderServices = async (teamId: string) =>
  AoiService.get<PaginatedResponse<ProviderServiceItem>>(
    `/admin/providers/${teamId}/services`
  );

export const getServiceProviderWithdrawals = async (teamId: string) =>
  AoiService.get<PaginatedResponse<ProviderWithdrawal>>(
    `/admin/providers/${teamId}/withdrawals`
  );

export const getServiceProviderConsultations = async (teamId: string) =>
  AoiService.get<PaginatedResponse<ProviderConsultation>>(
    `/admin/providers/${teamId}/consultations`
  );

export const getServiceProviderReviews = async (teamId: string) =>
  AoiService.get<PaginatedResponse<ProviderReview>>(
    `/admin/providers/${teamId}/reviews`
  );

export const getServiceProviderInvoices = async (teamId: string) =>
  AoiService.get<PaginatedResponse<ProviderInvoice>>(
    `/admin/providers/${teamId}/invoices`
  );


