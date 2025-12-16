import type { RouteObject } from "react-router";

export const alwaqfRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () =>
      import("./pages/alwaqfList/alwaqfList").then((m) => ({
        Component: m.default,
      })),
  },
];

export const alwaqfRoutePath = {
  ALWAQF_LIST: "/admin/alwaqf-list",
};
