import type { RouteObject } from "react-router";

export const consultantsManagementRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () =>
      import(
        "./pages/consultantsManagementList/consultantsManagementList"
      ).then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: ":id",
    lazy: () =>
      import("./pages/serviceProvider/serviceProvider").then((m) => ({
        Component: m.default,
      })),
  },
];

export const consultantsManagementRoutePath = {
  CONSULTANTS_MANAGEMENT_LIST: "/admin/consultants-management",
  CONSULTANTS_MANAGEMENT_PROVIDER: "/admin/consultants-management/:id",
};
