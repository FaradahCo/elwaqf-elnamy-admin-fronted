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
  };
};

export type PaginatedParams = {
  page?: number;
  per_page?: number;
};
