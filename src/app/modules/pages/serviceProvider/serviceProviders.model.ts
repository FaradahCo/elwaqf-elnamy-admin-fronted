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
