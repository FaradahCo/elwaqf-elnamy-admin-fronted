import type { RouteObject } from "react-router";

export const commissionSettingsRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () =>
      import("./pages/commissionSettings/commissionSettings").then((m) => ({
        Component: m.default,
      })),
  },
];

export const commissionSettingsRoutePath = {
  COMMISSION_SETTINGS: "/admin/settings",
};
