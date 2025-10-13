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

export type RegisterResponse = {
  token?: string;
  user?: User;
};

export type SendOTPPayload = {
  identifier?: string;
  region?: string;
  channel?: string;
};

export type VerifyOTPPayload = {
  identifier?: string;
  channel?: string;
  otp?: string | number;
  region?: string;
};

export type VerifyOTPResponse = {};

export type LoginPayload = {
  identifier: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type ForgotPasswordPayload = {
  identifier: string;
  region?: string;
  channel?: string;
};

export type ForgotPasswordResponse = {
  token: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
  password_confirmation: string;
  identifier?: string;
  region?: string;
};

export type ResetPasswordResponse = {};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  region: string;
  type: string;
  status: string;
  image: string;
  last_login_at: string;
  teams: Team[];
};

export type Team = {
  id: number;
  name: string;
  type: string;
  created_at: string;
};

// API error response types
export type ApiErrorResponse = {
  message?: string;
  errors?: Record<string, string | string[]>;
  status?: number;
};
