import type { RouteObject } from "react-router";
import MainLayout from "../../layouts/mainLayout";
import { ServiceProviderRoutes } from "./serviceProvider/serviceProviderRoutes";
import { serviceManagementRoutes } from "./serviceManagement/serviceManagementRoutes";
import DiscoundCodesRoutes from "./discoundCodes/discoundCodesRoutes";
import walletRoutes from "./wallet/walletRoutes";
import { consultantsManagementRoutes } from "./consultantsManagement/consultantsManagementRoutes";
import { staticPagesRoutes } from "./staticPages/staticPagesRoutes";
import consultationRoutes from "./consultation/consultationRoutes";

export const pagesRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import("./home/home").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "service-management",
        children: [...serviceManagementRoutes],
      },
      {
        path: "service-providers",
        children: [...ServiceProviderRoutes],
      },
      {
        path: "discound-codes",
        children: [...DiscoundCodesRoutes],
      },
      {
        path: "wallet",
        children: [...walletRoutes],
      },
      {
        path: "consultation",
        children: [...consultationRoutes],
      },
      {
        path: "consultants-management",
        children: [...consultantsManagementRoutes],
      },
      {
        path: "static-pages",
        children: [...staticPagesRoutes],
      },
      {
        path: "*",
        lazy: () =>
          import("@shared/components/underCreation").then((m) => ({
            Component: m.UnderCreation,
          })),
      },
    ],
  },
];

export const pagesRoutePath = {
  HOME: "/admin",
  SERVICE_PROVIDERS: "/admin/service-providers",
  SERVICE_MANAGEMENT_LIST: "/admin/service-management",
  DISCOUNT_CODES_LIST: "/admin/discound-codes",
  WALLET: "/admin/wallet",
  WALLET_TRANSACTIONS: "/admin/wallet/transactions",
  WALLET_BALANCES: "/admin/wallet/balances",
  CONSULTANTS_MANAGEMENT_LIST: "/admin/consultants-management",
  STATIC_PAGES_LIST: "/admin/static-pages",
};
