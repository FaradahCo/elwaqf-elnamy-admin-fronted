import type { PaginatedParams } from "@shared/model/shared.model";

export type ConsultantItem = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  status?: string;
  created_at: string;
  updated_at: string;
  status_label?: string;
  actions?: {
    edit: boolean;
    delete: boolean;
    view: boolean;
  };
  formatted_created_at?: string;
};

export type ConsultantsListParams = PaginatedParams & {
  status?: string;
  search?: string;
};

