import type {
  PaginatedParams,
  ServiceStatus,
} from "@shared/model/shared.model";
import type {
  DurationName,
  ServiceStatusEnum,
} from "@shared/services/sharedService";

export interface ServiceData {
  id?: string;
  title?: string;
  provider_id?: ProviderId;
  status?: ServiceStatusEnum;
  field?: Field;
  min_price?: number;
  duration?: Duration;
  type?: string;
  field_id?: number;
  provider?: ProviderId;
  pending_revision: ServiceRevision;
  description?: string;
  duration_type?: string;
  duration_time?: number;
  response_time?: number;
  requirements?: { title: string; id?: number; order: number }[];
  outputs?: { title: string; id?: number; order: number }[];
  scopes?: { title: string; id?: number; order: number }[];
  created_at?: string;
}

export type ProviderId = {
  id: number;
  business_name: string;
  logo: string;
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
