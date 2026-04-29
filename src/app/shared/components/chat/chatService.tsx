import AoiService from "@shared/services/api";
import type { Attachement, ChatMessage, ChatResponse } from "./chat.model";

type Role = "provider" | "client" | "admin";
const base = (role: Role) => `/${role}/chats`;

export const getAllMessages = async (role: Role) => {
  return AoiService.get<ChatMessage[]>(`${base(role)}`);
};

export const getConversations = async (role: Role) => {
  return AoiService.get<ChatMessage[]>(`${base(role)}`);
};

export const sendMessage = async (role: Role, data: FormData) => {
  return AoiService.postMultipart<ChatMessage>(`${base(role)}/send`, data);
};

export const showChat = async (role: Role, chatId: number) => {
  return AoiService.get<ChatResponse>(`${base(role)}/${chatId}`);
};

export const filterchat = async (
  role: Role,
  chatId: number,
  params: { type: "image" | "document" | "link" },
) => {
  return AoiService.get<Attachement[]>(
    `${base(role)}/${chatId}/filter`,
    params,
  );
};
