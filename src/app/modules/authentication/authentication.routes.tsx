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
          import("./signIn/signIn").then((module) => ({
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
    ],
  },
];

export const authenticationRoutePath = {
  LOGIN: "/auth",
  REGISTER: "/auth/register",
  VERIFY_OTP: "/auth/verify-otp",
};
