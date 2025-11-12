import type { PaginatedParams } from "@shared/model/shared.model";

export type WalletDashboard = {
  total_profits: string;
  withdrawal_balance: string;
  available_balance: number;
  pending_balance: number;
};

export type WithdrawItem = {
  id: number | string;
  code: string;
  wallet_id: number;
  bank_account_id: number;
  item_id: number;
  amount: string;
  status: string;
  note: string;
  invoice: string;
  receipt: string[];
  owner: Owner;
  bank_account: BankAccount;
  created_at: string;
};

export type BankAccount = {
  id: number;
  bank_name: string;
  account_name: string;
  iban: string;
  created_at: string;
  updated_at: string;
};

export type Owner = {
  name: string;
  type: string;
  id: number;
};

export interface WithdrawListParams extends PaginatedParams {
  status?: string;
  date_from?: number;
  date_to?: number;
  owner_name?: string;
}

export type BankTransferItem = {
  id?: number;
  name?: string;
  payment_id?: number;
  status?: string;
  status_label?: string;
  sender_name?: string;
  transfer_receipt_url?: string;
  admin_notes?: string;
  verified_at?: string;
  created_at?: string;
  payment: {
    id: number;
    code: string | null;
    client_id: number;
    status: string;
    status_label: string;
    subtotal: number;
    discount_amount: number;
    wallet_amount: number;
    total_paid: number;
    payment_method: string;
    payment_method_label: string;
    payment_gateway_ref: string | null;
    notes: string | null;
    created_at: string;
    items: Item[];
    invoice: Invoice;
  };
};

export interface BankTransferListParams extends PaginatedParams {
  status?: string;
  name?: string;
}

export interface PaymentClientListParams extends PaginatedParams {
  name?: string;
}

export type PaymentClientItem = {
  id: number;
  code: string | null;
  client_id: number;
  status: string;
  status_label: string;
  subtotal: number;
  discount_amount: number;
  wallet_amount: number;
  total_paid: number;
  payment_method: string;
  payment_method_label: string;
  payment_gateway_ref: string | null;
  notes: string | null;
  created_at: string;
  items: Item[];
  invoice: Invoice;
};

export type Invoice = {
  id: number;
  code: string;
  total_cost: number;
  odoo_url: string | null;
  created_at: string;
};

export type Item = {
  id: number;
  payment_id: number;
  quotation_id: number;
  service: {
    id: number;
    title: string;
  };
  status: string;
  status_label: string;
  price: number;
  discount_amount: number;
  final_price: number;
  platform_commission_rate: number;
  platform_commission_amount: number;
  provider_earning: number;
  created_at: string;
};

export type Wallet = {
  id: number;
  available_balance: string;
  pending_balance: string;
  locked_balance: number;
  total_transactions: string;
  total_balance: 1;
  updated_at: string;
  ownerable: {
    type: "Client" | "Provider";
    id: number;
    name: string;
    joined_at: string;
  };
};

export interface WalletListParams extends PaginatedParams {
  type?: string;
}

export interface VerifyBankTransferPayload {
  is_approved?: boolean;
  admin_notes?: string;
}
