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
      {
        path: "services",
        lazy: () =>
          import("./pages/services/services").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "services/:id",
        lazy: () =>
          import("./pages/services/serviceDetails.tsx").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "packages",
        lazy: () =>
          import("./pages/packages/packages").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "packages/:id",
        lazy: () =>
          import("./pages/packages/packageDetails.tsx").then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
];

export const clientRoutePath = {
  PROFILE: "/profile",
  SERVICES: "/services",
  PACKAGES: "/packages",
  SERVICE_DETAILS: (id: string) => `/services/${id}`,
  PACKAGE_DETAILS: (id: string) => `/packages/${id}`,
};