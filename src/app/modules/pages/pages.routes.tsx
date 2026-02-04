import type { RouteObject } from "react-router";
import MainLayout from "../../layouts/mainLayout";
import { alwaqfRoutes } from "./alwaqf/alwaqfRoutes";
import { consultantsManagementRoutes } from "./consultantsManagement/consultantsManagementRoutes";
import consultationRoutes from "./consultation/consultationRoutes";
import DiscoundCodesRoutes from "./discoundCodes/discoundCodesRoutes";
import { followRequestsRoutes } from "./followRequests/followRequestsRoutes";
import { serviceManagementRoutes } from "./serviceManagement/serviceManagementRoutes";
import { ServiceProviderRoutes } from "./serviceProvider/serviceProvidersRoutes";
import { staticPagesRoutes } from "./staticPages/staticPagesRoutes";
import walletRoutes from "./wallet/walletRoutes";

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
        path: "follow-requests",
        children: [...followRequestsRoutes],
      },
      {
        path: "service-providers",
        children: [...ServiceProviderRoutes],
      },
      {
        path: "reviews/:id",
        lazy: () =>
          import("./serviceProvider/pages/serviceProviderReview/serviceProviderReview").then(
            (m) => ({
              Component: m.default,
            }),
          ),
      },
      {
        path: "alwaqf-list",
        children: [...alwaqfRoutes],
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
