import type { PaginatedParams } from "@shared/model/shared.model";
import type { ServiceStatusEnum } from "@shared/services/sharedService";

export type ConsultantItem = {
  team_id: number;
  user_id: number;
  user_name: string;
  business_name: string;
  fields: [
    {
      id: number;
      name: string;
      slug: string;
    },
  ];
  created_at: string;
  status: string;
  status_label: string;
  logo: string;
  is_consultant: number;
};

export type ConsultantsListParams = PaginatedParams & {
  status?: string;
  user_name?: string;
  business_name?: string;
  field_id?: number;
};
export type UpdateConsultantStatusPayload = {
  items: {
    team_id: number;
    status: boolean;
    is_consultant?: boolean;
  }[];
};
export type Field = {
  id?: number;
  name?: string;
  slug?: string;
};

export type Media = {
  uuid?: string;
  name?: string;
  mime_type?: string;
  size?: number;
  url?: string;
};

export type ProviderMedia = {
  logo?: Media | null;
  vat_certificate?: Media | null;
  address_certificate?: Media | null;
  cr_certificate?: Media | null;
  vat_registration_certificate?: Media | null;
};

export type ProviderProfile = {
  id?: number; // team_id
  name?: string;
  type?: string;
  created_at?: string;
  provider_id?: number;
  business_name?: string;
  business_type?: "company" | "individual";
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
  bio?: string;
  media?: ProviderMedia;
};

export type ProviderUser = {
  id?: number; // user_id
  name?: string;
  email?: string;
  phone?: string;
  region?: string;
  type?: string;
  status?: ServiceStatusEnum;
  image?: string | null;
  last_login_at?: string;
  created_at?: string;
  profile?: ProviderProfile[];
  default_team_id?: number;
  current_team_id?: number;
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

export type ServiceDuration = {
  type?: "day" | "month" | "year";
  time?: number;
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

export type PaginationLink = {
  url?: string | null;
  label?: string;
  page?: number | null;
  active?: boolean;
};

export type PaginationMeta = {
  current_page?: number;
  from?: number;
  last_page?: number;
  links?: PaginationLink[];
  path?: string;
  per_page?: number;
  to?: number;
  total?: number;
};

export type PaginationLinks = {
  first?: string;
  last?: string;
  prev?: string | null;
  next?: string | null;
};

export type ServicesListParams = PaginatedParams & {
  status?: ServiceStatusEnum;
  type?: "service" | "package";
  field_id?: number;
  title?: string;
};

export type ServicesListResponse = {
  data?: ServiceItem[];
  meta?: PaginationMeta;
  links?: PaginationLinks;
};
