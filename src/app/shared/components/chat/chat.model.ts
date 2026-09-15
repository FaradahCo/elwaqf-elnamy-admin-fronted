import type { Team } from "@/app/modules/authentication/authentication.model";
import type { Client } from "@/app/modules/pages/alwaqf/alwaqfModel";

export type Role = "provider" | "client" | "admin";

export interface Sender {
  id?: number;
  name?: string;
  type?: string;
}

export interface Attachement {
  id?: number;
  url?: string;
  mime_type?: string;
  size?: number;
  created_at?: string;
  message_id?: number;
  type?: string;
  uuid?: string;
  created_time?: string;
  name?: string;
}

export interface Message {
  id: number;
  body: string;
  created_at: string;
  read_at?: string;
  sender: Sender;
  attachments: Attachement[];
  type?: string;
  url?: string;
  mime_type?: string;
  size?: number;
  created_time?: string;
  unread_count?: number;
}

export type ChatMessage = {
  id?: number;
  chatable_id?: number;
  chatable_type?: string;
  client_id?: number;
  team_id?: number;
  created_at?: string;
  updated_at?: string;
  latest_message?: Message;
  client?: Client;
  team?: Team;
  body?: string;
  title?: string;
  unread_count?: number;
};

export type TimelineItemKind =
  | "message"
  | "quotation"
  | "meeting"
  | "deliverable"
  | "service"
  | "event";

interface TimelineItemBase {
  id: number;
  created_at?: string;
  created_time?: string;
}

export interface TimelineMessageItem extends TimelineItemBase {
  kind: "message";
  body: string;
  read_at?: string;
  sender: Sender;
  attachments: Attachement[];
}

export interface TimelineQuotationItem extends TimelineItemBase {
  kind: "quotation";
  card?: {
    id?: number;
    status?: string;
    status_label?: string;
    duration?: number;
    price?: number | string;
    quotation_number?: number | string;
    valid_until?: string;
    offer_document?: string;
  };
}

export interface TimelineMeetingItem extends TimelineItemBase {
  kind: "meeting";
  title?: string;
  card?: {
    id?: number;
    status?: string;
    status_label?: string;
    duration?: number;
    meeting_at?: string;
    meet_url?: string;
  };
}

export interface TimelineDeliverableFile {
  id?: number;
  uuid?: string;
  name?: string;
  mime_type?: string;
  size?: number;
  url?: string;
}

export interface TimelineDeliverableItem extends TimelineItemBase {
  kind: "deliverable";
  card?: {
    id?: number;
    status?: string;
    status_label?: string;
    title?: string;
    files?: TimelineDeliverableFile[];
  };
}

export interface TimelineServiceItem extends TimelineItemBase {
  kind: "service";
  title?: string;
  status_label?: string;
  type?: string;
  card?: {
    id?: number;
    title?: string;
  };
}

export interface TimelineEventItem extends TimelineItemBase {
  kind: "event";
  title?: string;
  description?: string;
  event_type?: string;
  action_type?: string;
  action_type_label?: string;
  metadata?: unknown;
  status_snapshot?: {
    value?: string;
    label?: string;
  };
  actor_name?: string;
  actor_type_label?: string;
}

export type TimelineItem =
  | TimelineMessageItem
  | TimelineQuotationItem
  | TimelineMeetingItem
  | TimelineDeliverableItem
  | TimelineServiceItem
  | TimelineEventItem;

export interface TimelineSection {
  date_key: string;
  label: string;
  items: TimelineItem[];
}

export interface TimelinePagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url?: string | null;
  prev_page_url?: string | null;
}

export interface TimelineParticipant {
  id: number;
  name: string;
  business_name?: string | null;
  type?: string;
  logo?: string;
}

export interface TimelineResponse {
  sections: TimelineSection[];
  pagination: TimelinePagination;
  participants?: TimelineParticipant[];
}

export type ChatModel = Attachement[] | TimelineResponse;

/** @deprecated Use TimelineResponse instead */
export type ChatResponse = TimelineResponse;

export type SendMessagePayload = {
  chat_id?: number;
  body: string;
  attachments?: File[];
};
