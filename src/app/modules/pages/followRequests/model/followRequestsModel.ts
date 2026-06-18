import type { ServiceStatusEnum } from "@shared/services/sharedService";
import type { ServiceData } from "../../serviceManagement/model/serviceProviderList";
import type {
  PaginatedParams,
  ServiceStatus,
} from "@shared/model/shared.model";
import type { ProviderProfile } from "../../consultantsManagement/model/consultantsManagementModel";

export interface FollowRequestFilterQuery extends PaginatedParams {
  type?: string;
  status?: ServiceStatusEnum;
  title?: string;
}

export interface Accounting {
  client: {
    cost?: number | null;
    has_invoice?: boolean;
    invoice_url?: string | null;
    payment_method?: string | null;
    payment_method_val?: string | null;
  };
  consultant?: any;
  platform?: {
    discount_code?: string | null;
    discount_percentage?: number;
    discount_value?: number;
    has_discount?: boolean;
    has_percentage?: boolean;
    percentage?: number;
    percentage_value?: number;
  };
  provider?: {
    cost?: number | null;
    has_invoice?: boolean;
    has_transfer?: boolean;
    invoice_url?: string | null;
    transfer_url?: string | null;
  };
}

export interface FollowRequest {
  id: number;
  status: ServiceStatusEnum;
  status_label: string;
  created_at: string;
  updated_at: string;
  chat_id?: number;
  service: ServiceData;
  client: Client;
  accounting?: FollowRequestAccounting;
  quotations: Quotation[];
  active_quotation?: Quotation | null;
  latest_quotation?: Quotation;
  activities?: Activity[];
  accounting?: Accounting;
}
export type Client = {
  id: number;
  name: string;
  email: string;
};

export type Provider = {
  status?: ServiceStatusEnum;
  status_label?: string;
  name?: string;
  team_id?: number;
  user_id?: number;
  user_name?: string;
  business_name?: string;
  logo?: string;
  email?: string;
  phone?: string;
  profile?: ProviderProfile[];
};

export type FollowRequestAccounting = {
  client?: {
    cost?: number | null;
    payment_method?: string | null;
    payment_method_val?: string | null;
    has_invoice?: boolean;
    invoice_url?: string | null;
  };
  consultant?: {
    name?: string;
    percentage?: number | null;
    value?: number | null;
  };
  platform?: {
    has_percentage?: boolean;
    percentage?: number;
    percentage_value?: number;
    has_discount?: boolean;
    discount_code?: string | null;
    discount_percentage?: number;
    discount_value?: number;
  };
  provider?: {
    cost?: number | null;
    has_invoice?: boolean;
    invoice_url?: string | null;
    has_transfer?: boolean;
    transfer_url?: string | null;
  };
};

export type Quotation = {
  id?: number;
  service_request_id?: number;
  price?: number;
  valid_until?: string;
  additional_terms?: string;
  status?: ServiceStatusEnum;
  status_label?: string;
  commission?: number;
  cost?: string;
  created_at?: string;
  is_final?: boolean;
  is_in_cart?: boolean;
  price_before_tax?: string;
  quotation_number?: number;
  rejection_reason?: string;
  service_request?: {
    id: number;
    status: string;
    status_label: string;
    created_at: string;
    updated_at: string;
  };
  starts_at?: string;
  tax?: number;
  team_id?: number;
};
export type FollowRequestStatus = {
  label?: string;
  status?: string;
  count?: number;
};
export type FollowRequestStatusResponse = {
  data?: ServiceStatus[];
  total?: number;
};

export type FollowRequestsResponse = {};

export type PreviewQuotationPayload = {
  quotations: {
    service_id: number;
    price: number;
    valid_until: number;
    additional_terms?: string;
    starts_at?: string;
  }[];
  client_name?: string;
};

export type PreviewQuotationsAfterSendQouationsPayload = {
  quotation_ids: number[];
};
export type Activity = {
  id?: number;
  action_type?: string;
  action_type_label?: string;
  actor_name?: string;
  actor_type_label?: string;
  created_at?: string;
  description?: string;
  status_snapshot?: {
    label?: string;
    value?: string;
  };
};
