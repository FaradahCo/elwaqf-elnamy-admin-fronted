import type { RouteObject } from "react-router";
import MainLayout from "../../layouts/mainLayout";
import { ServiceProviderRoutes } from "./serviceProvider/serviceProviderRoutes";
import { serviceManagementRoutes } from "./serviceManagement/serviceManagementRoutes";

export const pagesRoutes: RouteObject[] = [
  {
    path: "/admin",
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
        path: "service-management",
        children: [...serviceManagementRoutes],
      },
      {
        path: "service-providers",
        children: [...ServiceProviderRoutes],
      },
    ],
  },
];

export const pagesRoutePath = {
  HOME: "/admin",
};
