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
  {
    path: "edit-service/:serviceId",
    lazy: () =>
      import("./pages/servicesManagementForm/servicesManagementForm").then(
        (module) => ({
          Component: module.default,
        })
      ),
  },
];

export const servicesManagementsPaths = {
  BASE: "/provider/services-management",
  ADD_SERVICE: "/provider/services-management/add-service",
  EDIT_SERVICE: (serviceId: number) =>
    `/provider/services-management/edit-service/${serviceId}`,
};
