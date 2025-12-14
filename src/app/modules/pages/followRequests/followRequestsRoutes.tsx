import type { RouteObject } from "react-router";

export const followRequestsRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () =>
      import("./pages/followRequestsList/followRequestsList").then((m) => ({
        Component: m.default,
      })),
  },
];

export const followRequestsRoutePath = {
  FOLLOW_REQUESTS: "/admin/follow-requests",
};
