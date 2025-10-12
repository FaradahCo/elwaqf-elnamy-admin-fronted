import type { RouteObject } from "react-router";

export const ServicesManagementRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () =>
      import("./pages/serviceManagementList/servicesManagementList").then(
        (module) => ({
          Component: module.default,
        })
      ),
  },
  {
    path: "add-service",
    lazy: () =>
      import("./pages/servicesManagementForm/servicesManagementForm").then(
        (module) => ({
          Component: module.default,
        })
      ),
  },
];
