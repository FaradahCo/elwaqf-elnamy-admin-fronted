import type { RouteObject } from "react-router";

const consultationRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () =>
      import(
        "./pages/consultationManagementList/consultationManagementList"
      ).then((m) => ({
        Component: m.default,
      })),
  },
];

export default consultationRoutes;

export const consultationRoutePath = {
  CONSULTATION: "/admin/consultation-management",
};
