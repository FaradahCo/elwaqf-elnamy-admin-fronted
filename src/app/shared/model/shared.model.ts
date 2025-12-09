export type PaginatedResponse<T> = {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    total: number;
    per_page: number;
  };
};

export type PaginatedParams = {
  page?: number;
  per_page?: number;
};

export enum ServiceClassification {
  service = "service",
  package = "package",
}

export type ServiceStatus = {
  label: string;
  status: string;
  count: number;
};

export type MediaItem = {
  id?: number;
  mime_type?: string;
  name?: string;
  size?: number;
  url?: string;
  uuid?: string;
};
