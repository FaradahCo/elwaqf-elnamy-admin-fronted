import type { Team } from "@/app/modules/authentication/authentication.model";
import type { Client } from "@/app/modules/pages/alwaqf/alwaqfModel";

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
  message_id?: 3;
  type?: string;
  uuid?: string;
  created_time?: string;
}

export interface Message {
  id: number;
  body: string;
  created_at: string;
  read_at: string;
  sender: Sender;
  attachments: Attachement[];
  type?: string;
  url?: string;
  mime_type?: string;
  size?: number;
  created_time?: string;
  unread_count?: number;
}

export type ChatModel = Attachement[] | ChatResponse;

export interface ChatResponse {
  sections?: {
    date_key?: string;
    label?: string;
    items?: Message[];
  }[];
}

export type SendMessagePayload = {
  chat_id?: number;
  body: string;
  attachments?: File[];
};
