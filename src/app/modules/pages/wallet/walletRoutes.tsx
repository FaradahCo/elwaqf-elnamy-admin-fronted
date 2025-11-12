import type { RouteObject } from "react-router";

const walletRoutes: RouteObject[] = [
  {
    path: "",
    lazy: () =>
      import("./walletLayout").then((m) => ({
        Component: m.default,
      })),
    children: [
      {
        index: true,
        lazy: () =>
          import("./pages/wallet/walletList").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "payments",
        lazy: () =>
          import("./pages/payments/paymentsList").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "balances",
        lazy: () =>
          import("./pages/balances/balancesList").then((m) => ({
            Component: m.default,
          })),
      },
    ],
  },
];

export default walletRoutes;

export const walletRoutePath = {
  WALLET: "/admin/wallet",
  PAYMENTS: "/admin/wallet/payments",
  BALANCES: "/admin/wallet/balances",
};
