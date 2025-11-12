import AoiService from "@shared/services/api";
import { transformFilterParams } from "@shared/services/sharedService";
import type {
  BankTransferItem,
  BankTransferListParams,
  PaymentClientItem,
  PaymentClientListParams,
  VerifyBankTransferPayload,
  Wallet,
  WalletDashboard,
  WalletListParams,
  WithdrawItem,
  WithdrawListParams,
} from "./wallet.model";
import type { PaginatedResponse } from "@shared/model/shared.model";

export const getWalletDashboard = async () => {
  return AoiService.get<WalletDashboard>(`admin/wallet/dashboard`);
};

export const getWithdrawList = async (params?: WithdrawListParams) => {
  return AoiService.get<PaginatedResponse<WithdrawItem>>(
    `admin/withdrawals`,
    transformFilterParams(params)
  );
};

export const getBankTransfers = async (params?: BankTransferListParams) => {
  return AoiService.get<PaginatedResponse<BankTransferItem>>(
    `admin/bank-transfers`,
    transformFilterParams(params)
  );
};

export const verifyBankTransfer = async (
  id: number | string,
  payload: VerifyBankTransferPayload
) => {
  return AoiService.post<VerifyBankTransferPayload, any>(
    `admin/bank-transfers/${id}/verify`,
    payload
  );
};

export const showBankTransferById = async (id: number | string) => {
  return AoiService.get<BankTransferItem>(`admin/bank-transfers/${id}`);
};

export const getPaymentClients = async (params?: PaymentClientListParams) => {
  return AoiService.get<PaginatedResponse<PaymentClientItem>>(
    `admin/payments`,
    transformFilterParams(params)
  );
};

export const getPaymentsProvider = async (params?: WithdrawListParams) => {
  return AoiService.get<PaginatedResponse<WithdrawItem>>(
    `admin/withdrawals`,
    transformFilterParams(params)
  );
};

export const getWallets = async (params?: WalletListParams) => {
  return AoiService.get<PaginatedResponse<Wallet>>(
    `admin/wallet`,
    transformFilterParams(params)
  );
};

export const showWithdrawById = async (id: number | string) => {
  return AoiService.get<WithdrawItem>(`admin/withdrawals/${id}`);
};

export const confirmWithdraw = async (
  id: number | string,
  formData: FormData
) => {
  return AoiService.postMultipart(`admin/withdrawals/${id}/status`, formData);
};
