import type { RouteObject } from "react-router";
import ClientLayout from "../../layouts/clientLayout";

export const clientRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import("./pages/landingPage/landingPage").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "profile",
        lazy: () =>
          import("./pages/profile/profile").then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
];

export const clientRoutePath = {
  PROFILE: "/profile",
};
