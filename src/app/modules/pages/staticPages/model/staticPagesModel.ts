import type { PaginatedParams } from "@shared/model/shared.model";

export type StaticPageItem = {
  id: number;
  title: string;
  slug?: string;
  content?: string;
  status?: string;
  created_at: string;
  updated_at: string;
  status_label?: string;
  show_in_registration?: boolean;
  show_in_footer?: boolean;
  show_in_menu?: boolean;
  user_type?: "provider" | "waqf" | "both";
  actions?: {
    edit: boolean;
    delete: boolean;
    view: boolean;
  };
  formatted_created_at?: string;
};

export type StaticPagesListParams = PaginatedParams & {
  status?: string;
  search?: string;
};

