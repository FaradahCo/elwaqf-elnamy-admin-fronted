import type { ServiceStatusEnum } from "@shared/services/sharedService";
import type { ServiceData } from "../../serviceManagement/model/serviceProviderList";

export interface FollowRequestFilterQuery {}

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

export type FollowRequestsResponse = {};
