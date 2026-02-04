import type { PaginatedParams } from "@shared/model/shared.model";
import type { ServiceStatusEnum } from "@shared/services/sharedService";

export interface ServiceProvidersListFilterQuery extends PaginatedParams {
  user_name?: string;
  status?: ServiceStatusEnum;
  field?: string;
  title?: string;
}

export type ServiceProviders = {
  team_id?: number;
  user_id?: number;
  user_name?: string;
  business_name?: string;
  business_type?: string;
  bio?: string | null;
  is_consultant?: number;
  country?: string;
  city?: string;
  district?: string;
  street?: string;
  building_number?: string;
  postal_code?: string;
  fields?: Fields;
  status?: string;
  status_label?: string;
  logo?: string;
  created_at?: string;
};
export type Fields = Array<Field>;
export type Field = {
  id?: number;
  name?: string;
  slug?: string;
  selected?: boolean;
};
export type serviceProvidersStatus = {
  status?: string;
  label?: string;
  count?: number;
};
export type serviceProvidersStatusResponse = {
  data?: serviceProvidersStatus[];
  total?: number;
};

export type ServiceOutput = {
  id?: number;
  title?: string;
  order?: number | null;
};

export type ServiceScope = {
  id?: number;
  title?: string;
  order?: number | null;
};

export type ServiceRequirement = {
  id?: number;
  title?: string;
  order?: number | null;
};
export type ServiceProvider = {
  id?: number;
  business_name?: string;
  logo?: string;
};

export type ServiceField = {
  id?: number;
  name?: string;
  slug?: string;
};

export type PendingRevisionItem = {
  id?: number | null;
  title?: string;
  order?: number | null;
};
export type PendingRevisionData = {
  title?: string;
  field_id?: number;
  duration_type?: "day" | "month" | "year";
  duration_time?: number;
  min_price?: string;
  response_time?: number;
  items?: {
    requirements?: PendingRevisionItem[];
    outputs?: PendingRevisionItem[];
    scopes?: PendingRevisionItem[];
  };
};
export type PendingRevision = {
  id?: number;
  status?: ServiceStatusEnum;
  previous_status?: ServiceStatusEnum;
  note?: string | null;
  data?: PendingRevisionData;
  updated_at?: string;
  created_at?: string;
};

export type ServiceDuration = {
  type?: "day" | "month" | "year";
  time?: number;
};
export type ServiceItem = {
  id?: number;
  team_id?: number;
  provider?: ServiceProvider;
  type?: "service" | "package";
  status?: ServiceStatusEnum;
  status_label?: string;
  title?: string;
  field?: ServiceField;
  description?: string;
  duration?: ServiceDuration;
  min_price?: string;
  response_time?: number;
  commission_rate?: number;
  outputs?: ServiceOutput[];
  scopes?: ServiceScope[];
  requirements?: ServiceRequirement[];
  pending_revision?: PendingRevision | null;
  published_at?: string | null;
  updated_at?: string;
  created_at?: string;
};
export type ProviderDashboard = {
  total_service_requests: number;
  completed_service_requests: number;
  in_progress_service_requests: number;
  locked_balance: number;
};
export type Wallet = {
  id: number;
  available_balance: string;
  pending_balance: string;
  locked_balance: number;
  total_transactions: string;
  total_balance: number;
  updated_at: string;
};
