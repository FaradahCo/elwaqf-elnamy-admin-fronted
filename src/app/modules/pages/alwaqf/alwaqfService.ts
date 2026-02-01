import { transformFilterParams } from "@shared/services/sharedService";
import type {
  Alwaqf,
  AlwaqfDashboard,
  AlwaqfFilterQuery,
  AlwaqfServiceQuery,
  AlwaqfStatus,
  AlwaqfStatusResponse,
  Client,
  Consultation,
  Invoice,
  ServiceRequest,
  Wallet,
} from "./alwaqfModel";
import AoiService from "@shared/services/api";
import type { PaginatedResponse } from "@shared/model/shared.model";
import type { PaymentClientItem } from "../wallet/wallet.model";

export const getAlwaqfList = async (params: AlwaqfFilterQuery) => {
  return AoiService.get<PaginatedResponse<Alwaqf>>(
    "/admin/clients",
    transformFilterParams(params),
  );
};

export const getAlWaqfStatus = async () =>
  AoiService.get<AlwaqfStatusResponse>(`/admin/clients/status-counts`);

export const getAlWaqfDetails = async (id: number) =>
  AoiService.get<Client>(`/admin/clients/${id}`);

export const getAlWaqfDashboard = async (id: number) =>
  AoiService.get<AlwaqfDashboard>(`/admin/clients/${id}/dashboard`);

export const getAlWaqfServiceRequests = async (
  id: number,
  params?: AlwaqfServiceQuery,
) =>
  AoiService.get<PaginatedResponse<ServiceRequest>>(
    `/admin/clients/${id}/service-requests`,
    transformFilterParams(params),
  );

export const getAlWaqfServiceConsultations = async (
  id: number,
  params?: AlwaqfServiceQuery,
) =>
  AoiService.get<PaginatedResponse<Consultation>>(
    `/admin/clients/${id}/consultations`,
    transformFilterParams(params),
  );

export const getAlWaqfWallet = async (id: number) =>
  AoiService.get<Wallet>(`/admin/clients/${id}/wallet`);
// export const getAlWaqfReviews = async (id: number) =>
//   AoiService.get<>(`/admin/clients/${id}/reviews`);

export const getAlWaqfInvoices = async (
  id: number,
  params?: AlwaqfServiceQuery,
) =>
  AoiService.get<PaginatedResponse<Invoice>>(
    `/admin/clients/${id}/invoices`,
    transformFilterParams(params),
  );

export const getAlWaqfPayments = async (
  id: number,
  params?: AlwaqfServiceQuery,
) =>
  AoiService.get<PaginatedResponse<PaymentClientItem>>(
    `/admin/clients/${id}/payments`,
    transformFilterParams(params),
  );
export const updateAlwaqfStatus = async (
  id: number,
  data: Partial<AlwaqfStatus>,
) => {
  return AoiService.patch<Partial<AlwaqfStatus>, unknown>(
    `admin/clients/${id}/update`,
    data,
  );
};
