import type { RouteObject } from "react-router";

const DiscoundCodesRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () =>
      import("./pages/discoundCodesList/discoundCodesList").then((m) => ({
        Component: m.default,
      })),
  },
];

export default DiscoundCodesRoutes;

export const discoundCodesRoutePath = {};
