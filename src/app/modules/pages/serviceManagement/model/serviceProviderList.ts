import type { PaginatedParams } from "@shared/model/shared.model";
import type { DurationName } from "@shared/services/sharedService";

export enum ServiceStatus {
  draft = "draft",
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
  revision_pending = "revision_pending",
  inactive = "inactive",
  disabled = "disabled",
  hidden = "hidden",
}

export type ServiceStatusLabel = {
  count: number;
  label: string;
  status: string;
};

export interface ServiceData {
  id?: string;
  title?: string;
  provider_id?: ProviderId;
  status?: string;
  field?: Field;
  min_price?: number;
  duration?: Duration;
  type?: string;
  field_id?: number;
  description?: string;
  duration_type?: string;
  duration_time?: number;
  response_time?: number;
  requirements?: { title: string; id?: number; order: number }[];
  outputs?: { title: string; id?: number; order: number }[];
  scopes?: { title: string; id?: number; order: number }[];
}

export type ProviderId = {
  id: number;
  business_name: string;
};

export type Field = {
  id: number;
  slug: string;
  name: string;
  selected?: boolean;
};

export type Duration = {
  type: DurationName;
  time: number;
};

export interface ServiceManagementQuery extends PaginatedParams {
  type?: string;
  provider_id?: number;
  status?: ServiceStatus;
}

export type ServiceRevision = {
  id: number;
  status: string;
  previous_status: string;
  note: string;
  data: ServiceData;
  service: ServiceData;
  created_at: string;
  updated_at: string;
};
