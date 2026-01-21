import type { ServiceStatusEnum } from "@shared/services/sharedService";
import type { ServiceData } from "../../serviceManagement/model/serviceProviderList";
import type { PaginatedParams } from "@shared/model/shared.model";

export interface FollowRequestFilterQuery extends PaginatedParams {
  type?: string;
  status?: ServiceStatusEnum;
  title?: string;
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
  quotations: Quotation[];
  latest_quotation?: Quotation;
}
export type Client = {
  id: number;
  name: string;
  email: string;
};

export type Provider = {
  id?: number;
  user_id?: number;
  user_name?: string;
  business_name?: string;
  logo?: string;
};
export type Quotation = {
  service_request_id?: number;
  price?: number;
  valid_until?: string;
  additional_terms?: string;
  status?: ServiceStatusEnum;
  status_label?: string;
};
export type FollowRequestStatus = {
  label?: string;
  status?: string;
  count?: number;
};
export type FollowRequestStatusResponse = {
  data?: FollowRequestStatus[];
  total?: number;
};

export type FollowRequestsResponse = {};
