import type { PaginatedParams } from "@shared/model/shared.model";
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
