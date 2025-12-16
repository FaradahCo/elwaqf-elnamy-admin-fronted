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
