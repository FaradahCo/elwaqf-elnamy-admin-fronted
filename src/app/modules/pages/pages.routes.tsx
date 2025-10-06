import type { RouteObject } from "react-router";
import MainLayout from "../../layouts/mainLayout";

export const pagesRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import("./home/home").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "profile",
        lazy: () =>
          import("./profile/profile").then((m) => ({
            Component: m.default,
          })),
      },
    ],
  },
];

export const pagesRoutePath = {
  PROFILE: "profile",
};
