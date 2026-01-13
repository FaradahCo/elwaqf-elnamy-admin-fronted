import type { RouteObject } from "react-router";
import AuthenticationLayout from "../../layouts/authenticationLayout";

export const authenticationRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AuthenticationLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import("./login/login").then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
];

export const authenticationRoutePath = {
  LOGIN: "/",
};
