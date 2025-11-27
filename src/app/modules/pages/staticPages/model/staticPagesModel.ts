import type { PaginatedParams } from "@shared/model/shared.model";

export type StaticPageItem = {
  id?: number;
  title?: string;
  slug?: string;
  content?: string;
  status?: string;
  created_at: string;
  updated_at: string;
  status_label?: string;
  show_in_registration?: boolean;
  show_in_footer?: boolean;
  show_in_menu?: boolean;
  scope?: string;
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
  title?: string;
  slug?: string;
  user_type?: string;
  show_in_registration?: boolean;
  show_in_footer?: boolean;
  show_in_menu?: boolean;
  scope?: string;
};

export type StaticPagePayload = {
  title?: string;
  slug?: string;
  content?: string;
  scope?: string;
  is_published?: boolean;
  show_in_menu?: false;
  show_in_footer?: boolean;
  show_in_registration?: boolean;
};
