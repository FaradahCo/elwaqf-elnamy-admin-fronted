import AoiService from "../../shared/services/api";
import type { RegisterPayload, RegisterResponse, LoginPayload, LoginResponse, ForgotPasswordPayload, ForgotPasswordResponse } from "./authentication.model";

export const AuthenticationService = {
  login: async (data: LoginPayload) => {
    return AoiService.post<LoginPayload, LoginResponse>(
      "/auth/login",
      data
    );
  },

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

  forgotPassword: async (data: ForgotPasswordPayload) => {
    return AoiService.post<ForgotPasswordPayload, ForgotPasswordResponse>(
      "/auth/forgot-password",
      data
    );
  },

  logout: async () => {
    return AoiService.post<null, any>("/auth/logout");
  },
};
