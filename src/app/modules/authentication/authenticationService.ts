import AoiService from "../../shared/services/api";
import type { RegisterPayload, RegisterResponse } from "./authentication.model";

export const AuthenticationService = {
  register: async (data: RegisterPayload) => {
    return AoiService.post<RegisterPayload, RegisterResponse>(
      "/provider/register",
      data
    );
  },

  sendOtp: async (data: any) => {
    return AoiService.post<any, any>("/core/otp/send", data);
  },

  verifyOtp: async (data: any) => {
    return AoiService.post<any, any>("/core/otp/verify", data);
  },

  logout: async () => {
    return AoiService.post<null, any>("/auth/logout");
  },
};
