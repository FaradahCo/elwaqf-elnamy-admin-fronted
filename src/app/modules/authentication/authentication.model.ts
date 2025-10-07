export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  region: string;
  password: string;
  password_confirmation: string;
  is_verified?: boolean;
  channel?: string;
};

export type RegisterResponse = {};

export type SendOTPPayload = {
  identifier?: string;
  region?: string;
  channel?: string;
};

export type VerifyOTPPayload = {
  identifier?: string;
  channel?: string;
  otp?: number;
};

export type VerifyOTPResponse = {};

export type LoginPayload = {
  identifier: string;
  password: string;
};

export type LoginResponse = {};

export type ForgotPasswordPayload = {
  identifier: string;
};

export type ForgotPasswordResponse = {};