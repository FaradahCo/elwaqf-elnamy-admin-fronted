import AoiService from "@shared/services/api";
import type {
  Attachement,
  ChatMessage,
  Role,
  TimelineResponse,
} from "./chat.model";

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

export const showChat = async (
  role: Role,
  chatId: number,
  params?: { page?: number; per_page?: number },
) => {
  return AoiService.get<TimelineResponse>(`${base(role)}/${chatId}`, params);
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

export const printQuotation = async (role: Role, quotationId: number) => {
  return AoiService.postBlob<{ quotation_ids: number[] }>(
    `/${role}/quotations/print`,
    {
      quotation_ids: [quotationId],
    },
  );
};
