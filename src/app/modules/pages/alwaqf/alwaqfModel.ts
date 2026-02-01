import type { Field, PaginatedParams } from "@shared/model/shared.model";
import type { ServiceStatusEnum } from "@shared/services/sharedService";

export interface AlwaqfFilterQuery extends PaginatedParams {
  user_name?: string;
  search?: string;
  status?: ServiceStatusEnum;
}
export type Alwaqf = {
  id?: number;
  user_name?: string;
  waqf_name?: string;
  created_at?: string;
  status?: ServiceStatusEnum;
  status_label?: string;
};

export type AlwaqfStatus = {
  count?: number;
  label?: string;
  status?: string;
};
export type AlwaqfStatusResponse = {
  data?: AlwaqfStatus[];
  total?: number;
};

export type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  region: string;
  type: "client" | "admin" | "provider";
  status: "active" | "inactive";
  image: string | null;
  last_login_at: string;
  created_at: string;
  profile: ClientProfile;
};

export type ClientProfile = {
  is_completed: boolean;
  waqf_name: string;
  waqf_certificate_number: string;
  vat_number: string;
  postal_code: string;
  building_number: string;
  city: string;
  district: string;
  street: string;
  logo: string;
};
export type AlwaqfDashboard = {
  total_service_requests: number;
  completed_service_requests: number;
  in_progress_service_requests: number;
  locked_balance: number;
};

export type Duration = {
  type: string;
  time: number;
};

export type ServiceOutput = {
  id: number;
  title: string;
  order: number;
};

export type ServiceScope = {
  id: number;
  title: string;
  order: number;
};

export type ServiceRequirement = {
  id: number;
  title: string;
  order: number;
};

export type ServiceProvider = {
  team_id?: number;
  name?: string;
  type?: string;
  created_at?: string;
  provider_id?: number;
  business_name?: string;
  business_type?: string;
  bio?: string | null;
  is_consultant?: 0 | 1;
  cr_number?: string;
  cr_issue_date?: string;
  cr_expiry_date?: string;
  vat_number?: string;
  vat_issue_date?: string;
  vat_expiry_date?: string;
  seven_hundred?: string;
  country?: string;
  city?: string;
  district?: string;
  street?: string;
  building_number?: string;
  postal_code?: string;
  updated_at?: string;
  logo?: string;
  fields?: Field[];
  media?: TeamMedia;
};

export type Service = {
  id: number;
  team_id: number;
  provider: ServiceProvider;
  type: string;
  status: ServiceStatusEnum;
  status_label: string;
  title: string;
  field: Field;
  description: string;
  duration: Duration;
  min_price: string;
  response_time: number;
  commission_rate: number;
  outputs: ServiceOutput[];
  scopes: ServiceScope[];
  requirements: ServiceRequirement[];
  published_at: string | null;
  updated_at: string;
  created_at: string;
};

export type DateTimeInfo = {
  date: string;
  time_am_pm: string;
  time_24h: string;
  date_readable: string;
};

export type RemainingTime = {
  expired: boolean;
  start_date: DateTimeInfo;
  deadline: DateTimeInfo;
  remaining_days: number;
  human_readable: string;
};

export type ServiceRequest = {
  id: number;
  status: ServiceStatusEnum;
  status_label: string;
  created_at: string;
  updated_at: string;
  service: Service;
  remaining_time: RemainingTime;
};

export interface AlwaqfServiceQuery extends PaginatedParams {
  provider_id?: number;
  status?: ServiceStatusEnum;
}

export type MediaItem = {
  id: number;
  uuid: string;
  name: string;
  mime_type: string;
  size: number;
  url: string;
};

export type TeamMedia = {
  logo: MediaItem | null;
  vat_certificate: MediaItem | null;
  address_certificate: MediaItem | null;
  cr_certificate: MediaItem | null;
  vat_registration_certificate: MediaItem | null;
};
export type TeamProvider = {
  team_id: number;
  name: string;
  type: "provider" | "client";
  created_at: string;
  provider_id: number;
  business_name: string;
  business_type: "company" | "individual";
  bio: string | null;
  is_consultant: 0 | 1;
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
  fields: Field[];
  media: TeamMedia;
};

export type ConsultationUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  region: string;
  type: string;
  status: ServiceStatusEnum;
  image: string | null;
  last_login_at: string;
  created_at: string;
  profile: ClientProfile;
};

// Answer type
export type ConsultationAnswer = {
  id: number;
  question_id: number;
};

export type Consultation = {
  id: number;
  status: ServiceStatusEnum;
  status_label: string;
  meeting_at: string;
  meeting_end_at: string;
  meeting_duration_minutes: number;
  client_joined_at: string | null;
  team_joined_at: string | null;
  reject_reason: string | null;
  created_at: string;
  created_since: string;
  meeting_link: string;
  team: TeamProvider;
  user: ConsultationUser;
  answers: ConsultationAnswer[];
  service_requests: ServiceRequest[];
  remaining_time: RemainingTime;
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

export type PaymentItem = {
  id: number;
  payment_id: number;
  quotation_id: number;
  status: ServiceStatusEnum;
  status_label: string;
  price: number;
  discount_amount: number;
  final_price: number;
  platform_commission_rate: number;
  platform_commission_amount: number;
  provider_earning: number;
  created_at: string;
};

export type Payment = {
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
  items: PaymentItem[];
};

export type Invoice = {
  id: number;
  code: string;
  total_cost: number;
  odoo_url: string;
  created_at: string;
  payment: Payment;
};
