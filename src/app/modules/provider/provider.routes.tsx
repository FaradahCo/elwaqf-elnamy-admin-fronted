import type { RouteObject } from "react-router";
import MainLayout from "../../layouts/mainLayout";

export const providerRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import("./pages/home/home").then((module) => ({
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

export const providerRoutePath = {
  PROFILE: "/profile",
};
