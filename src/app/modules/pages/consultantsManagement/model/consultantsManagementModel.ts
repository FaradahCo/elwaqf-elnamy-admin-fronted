import type { PaginatedParams } from "@shared/model/shared.model";

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
    }
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
  }[];
};
