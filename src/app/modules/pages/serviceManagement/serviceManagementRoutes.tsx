import type { RouteObject } from "react-router";

export const serviceManagementRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () =>
      import("./pages/serviceManagementList/serviceManagementList").then(
        (m) => ({
          Component: m.default,
        })
      ),
  },
  {
    path: "reviews/:id",
    lazy: () =>
      import("./pages/serviceReview/serviceReview").then((m) => ({
        Component: m.default,
      })),
  },
];

export const serviceManagementRoutePath = {
  SERVICE_MANAGEMENT_LIST: "/admin/service-management",
  SERVICE_REVIEW: "/admin/service-management/reviews/:id",
};
