import type { FormInstance } from "antd";

export interface ServiceFormData {
  type?: string;
  title?: string;
  field_id?: number;
  description?: string;
  duration?: {
    time?: number;
    type?: string;
  };
  duration_type?: string;
  duration_time?: number;
  min_price?: number;
  response_time?: number;
  requirements?: { title: string; id: number }[];
  outputs?: { title: string; id: number }[];
  scopes?: { title: string; id: number }[];
  field?: Field;
}

export type Field = {
  id: number;
  name: string;
  slug: string;
  selected: boolean;
};

export interface FormnProps {
  form: FormInstance;
}
