import type { RouteObject } from "react-router";
import MainLayout from "../../layouts/mainLayout";
import { ServicesManagementRoutes } from "./pages/services-management/servisesManagements.routes";

export const providerRoutes: RouteObject[] = [
  {
    path: "/provider",
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
      {
        path: "services-management",
        children: ServicesManagementRoutes,
      },
    ],
  },
];

export const providerRoutePath = {
  PROFILE: "/provider/profile",
  SERVICES_MANAGEMENT: "/provider/services-management",
  ADD_SERVICE: "/provider/services-management/add-service",
};
