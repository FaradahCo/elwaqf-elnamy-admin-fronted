import type { ServiceData } from "../../serviceManagement/model/serviceProviderList";

export type DiscoundCodeItem = {
  id: number;
  name: string;
  code: string;
  start_at?: string;
  discount: number;
  status: string;
  created_at: string;
  updated_at: string;
  percentage?: number;
  type?: "service" | "package" | "all";
  remaining_uses?: number;
  expires_at?: string;
  service_ids?: number[];
  type_label?: string;
  status_label?: string;
  is_expired?: boolean;
  is_active?: boolean;
  services?: ServiceData[];
  services_count?: number;
  // Enhanced fields for performance
  actions?: {
    edit: boolean;
    delete: boolean;
    view: boolean;
  };
  formatted_created_at?: string;
  formatted_expires_at?: string | null;
};

export type DiscoundListParams = {
  page?: number;
  per_page?: number;
  type?: "service" | "package";
  status?: "active" | "inactive";
  start_at?: string;
  expires_at?: string;
  service_ids?: number[];
  code?: string;
  percentage?: number;
};

export type CodeType = "percentage" | "fixed";
export type CodeStatus = "active" | "inactive" | "expired";
