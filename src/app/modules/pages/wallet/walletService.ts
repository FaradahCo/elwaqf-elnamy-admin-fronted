import AoiService from "@shared/services/api";

export const getWallet = async () => {
  return AoiService.get<{ balance: number }>(`admin/wallet`);
};

export const shoeWalletById = (walletId: number) => {
  return AoiService.get<{ wallet: any }>(`admin/wallet/${walletId}`);
};

export const showWalletTransaction = async (params?: any) => {
  return AoiService.get<{ transactions: any[] }>(
    `provider/wallet/transactions`,
    params
  );
};

export const showWalletTransactionById = async (transactionId: string) => {
  return AoiService.get<{ transaction: any }>(
    `provider/wallet/transactions/${transactionId}`
  );
};
