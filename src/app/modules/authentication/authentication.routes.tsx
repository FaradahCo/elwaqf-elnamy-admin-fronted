import type { RouteObject } from "react-router";
import AuthenticationLayout from "../../layouts/authenticationLayout";

export const authenticationRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthenticationLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import("./login/login").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "register",
        lazy: () =>
          import("./register/register").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "forgot-password",
        lazy: () =>
          import("./forgotPassword/forgotPassword").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "verify-otp",
        lazy: () =>
          import("./verifyOTP/verifyOTP").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "reset-password",
        lazy: () =>
          import("./resetPassword/resetPassword").then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
];

export const authenticationRoutePath = {
  LOGIN: "/auth",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  VERIFY_OTP: "/auth/verify-otp",
  RESET_PASSWORD: "/auth/reset-password",
};
