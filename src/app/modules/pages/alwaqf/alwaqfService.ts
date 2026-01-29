import { transformFilterParams } from "@shared/services/sharedService";
import type {
  Alwaqf,
  AlwaqfDashboard,
  AlwaqfFilterQuery,
  AlwaqfServiceQuery,
  AlwaqfStatusResponse,
  Client,
  Consultation,
  Invoice,
  ServiceRequest,
  Wallet,
} from "./alwaqfModel";
import AoiService from "@shared/services/api";
import type { PaginatedResponse } from "@shared/model/shared.model";

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
export const getAlWaqfInvoices = async (
  id: number,
  params?: AlwaqfServiceQuery,
) =>
  AoiService.get<PaginatedResponse<Invoice>>(
    `/admin/clients/${id}/invoices`,
    transformFilterParams(params),
  );
