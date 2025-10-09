import AoiService from "@services/api";
import type {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "./authentication.model";

export const AuthenticationService = {
  login: async (data: LoginPayload) => {
    return AoiService.post<LoginPayload, LoginResponse>("/auth/login", data);
  },

  register: async (data: RegisterPayload, type: string = "provider") => {
    return AoiService.post<RegisterPayload, RegisterResponse>(
      type === "provider" ? "/provider/register" : "client/register",
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

  resetPassword: async (data: ResetPasswordPayload) => {
    return AoiService.post<ResetPasswordPayload, ResetPasswordResponse>(
      "/auth/reset-password",
      data
    );
  },

  logout: async () => {
    return AoiService.post<null, any>("/auth/logout");
  },
};
