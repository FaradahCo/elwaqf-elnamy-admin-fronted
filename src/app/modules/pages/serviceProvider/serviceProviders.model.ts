import type { PaginatedParams } from "@shared/model/shared.model";
import type { ServiceStatusEnum } from "@shared/services/sharedService";

export interface ServiceProvidersListFilterQuery extends PaginatedParams {
  user_name?: string;
  status?: ServiceStatusEnum;
  field?: string;
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

export type ProviderProfile = {
  id: number;
  name: string;
  type: string;
  created_at: string;
  provider_id: number;
  business_name: string;
  business_type: string;
  cr_number: string;
  cr_issue_date: string;
  cr_expiry_date: string;
  vat_number: string;
  vat_issue_date: string;
  vat_expiry_date: string;
  seven_hundred: string;
  country: string;
  city: string;
  district: string;
  street: string;
  building_number: string;
  postal_code: string;
  updated_at: string;
  logo: string;
  fields: Fields;
  media: {
    logo: MediaObj;
    vat_certificate: MediaObj | null;
    address_certificate: MediaObj | null;
    cr_certificate: MediaObj | null;
    vat_registration_certificate: MediaObj | null;
  };
};

export type MediaObj = {
  uuid: string;
  name: string;
  mime_type: string;
  size: number;
  url: string;
};

export type ServiceProviderDetails = {
  id: number;
  name: string;
  email: string;
  phone: string;
  region: string;
  type: string;
  status: string;
  status_label?: string;
  image: string | null;
  last_login_at: string;
  created_at: string;
  profile: ProviderProfile[];
  default_team_id: number;
  current_team_id: number;
};

export type ProviderDashboardStats = {
  total_service_requests: number;
  completed_service_requests: number;
  in_progress_service_requests: number;
  locked_balance: string;
};

export type ProviderWallet = {
  id: number;
  available_balance: string;
  pending_balance: string;
  locked_balance: string;
  total_transactions: string;
  total_balance: number;
  updated_at: string;
};

export type ProviderServiceRequest = {
  id: number;
  status: string;
  status_label: string;
  created_at: string;
  updated_at: string;
  service: {
    id: number;
    title: string;
    type: string;
    status: string;
    status_label: string;
    min_price: string;
    duration: { type: string; time: number };
  };
  client: {
    id: number;
    name: string;
    email: string;
  };
  remaining_time: any;
};

export type ProviderServiceItem = {
  id: number;
  team_id: number;
  type: string;
  status: string;
  status_label: string;
  title: string;
  description: string;
  min_price: string;
  duration: { type: string; time: number };
  created_at: string;
  field: { id: number; name: string; slug: string };
};

export type ProviderWithdrawal = {
  id: number;
  code: string;
  amount: string;
  status: string;
  note: string | null;
  created_at: string;
  bank_account: {
    bank_name: string;
    account_name: string;
    iban: string;
  };
};

export type ProviderConsultation = {
  id: number;
  consultation_number: string;
  status: string;
  status_label: string;
  created_at: string;
  client: { name: string; avatar: string | null };
  details: string;
  appointment_date: string;
  amount: number;
};

export type ProviderReview = {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  client: { name: string; avatar: string | null };
  service_title: string;
};

export type ProviderInvoice = {
  id: number;
  invoice_number: string;
  amount: number;
  status: string;
  status_label: string;
  issue_date: string;
  due_date: string;
  service_title: string;
  client_name: string;
  file_url: string;
};
