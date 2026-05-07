import type { RouteObject } from "react-router";

export const followRequestsRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () =>
      import("./pages/followRequestsList/followRequestsList").then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: ":id",
    lazy: () =>
      import("./pages/followRequestsDetails/followRequestsDetails").then(
        (m) => ({
          Component: m.default,
        }),
      ),
  },
];

export const followRequestsRoutePath = {
  FOLLOW_REQUESTS: "/admin/follow-requests",
  FOLLOW_REQUESTS_DETAILS: "/admin/follow-requests/:id",
};
