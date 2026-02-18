import type { RouteObject } from "react-router";

export const alwaqfRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () =>
      import("./pages/alwaqfList/alwaqfList").then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: ":id",
    lazy: () =>
      import("./pages/alwaqfDetails/alwaqfDetailsLayout").then((m) => ({
        Component: m.default,
      })),
    children: [
      {
        index: true,
        lazy: () =>
          import("./pages/alwaqfDetails/pages/profile/profile").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "profile",
        lazy: () =>
          import("./pages/alwaqfDetails/pages/profile/profile").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "requests",
        lazy: () =>
          import("./pages/alwaqfDetails/pages/requests/requests").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "consultation",
        lazy: () =>
          import("./pages/alwaqfDetails/pages/consultation/consultation").then(
            (m) => ({
              Component: m.default,
            }),
          ),
      },
      {
        path: "wallet",
        lazy: () =>
          import("./pages/alwaqfDetails/pages/wallet/wallet").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "invoices",
        lazy: () =>
          import("./pages/alwaqfDetails/pages/invoices/invoices").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "reviews",
        lazy: () =>
          import("./pages/alwaqfDetails/pages/reviews/reviews").then((m) => ({
            Component: m.default,
          })),
      },
    ],
  },
];

export const alwaqfRoutePath = {
  ALWAQF_LIST: "/admin/alwaqf-list",
  ALWAQF_DETAILS: (id: number) => `/admin/alwaqf-list/${id}/profile`,
  ALWAQF_PROFILE: (id: number) => `/admin/alwaqf-list/${id}/profile`,
  ALWAQF_REQUESTS: (id: number) => `/admin/alwaqf-list/${id}/requests`,
  ALWAQF_CONSULTATION: (id: number) => `/admin/alwaqf-list/${id}/consultation`,
  ALWAQF_WALLET: (id: number) => `/admin/alwaqf-list/${id}/wallet`,
  ALWAQF_INVOICES: (id: number) => `/admin/alwaqf-list/${id}/invoices`,
  ALWAQF_REVIEWS: (id: number) => `/admin/alwaqf-list/${id}/reviews`,
};
