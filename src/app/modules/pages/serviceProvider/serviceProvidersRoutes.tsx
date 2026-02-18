import type { RouteObject } from "react-router";

export const ServiceProviderRoutes: RouteObject[] = [
  {
    lazy: () =>
      import("./pages/serviceProviderLayout").then((m) => ({
        Component: m.default,
      })),
    children: [
      {
        index: true,
        lazy: () =>
          import("./pages/serviceProvidersList/serviceProvidersList").then(
            (m) => ({
              Component: m.default,
            }),
          ),
      },
      {
        path: ":id",
        lazy: () =>
          import("./pages/serviceProvidersDetails/serviceProviderDetailsLayout").then(
            (m) => ({
              Component: m.default,
            }),
          ),
        children: [
          {
            index: true,
            lazy: () =>
              import("./pages/serviceProvidersDetails/pages/profile/profile").then(
                (m) => ({
                  Component: m.default,
                }),
              ),
          },
          {
            path: "profile",
            lazy: () =>
              import("./pages/serviceProvidersDetails/pages/profile/profile").then(
                (m) => ({
                  Component: m.default,
                }),
              ),
          },
          {
            path: "services",
            lazy: () =>
              import("./pages/serviceProvidersDetails/pages/providerServices/providerServices").then(
                (m) => ({
                  Component: m.default,
                }),
              ),
          },
          {
            path: "requests",
            lazy: () =>
              import("./pages/serviceProvidersDetails/pages/requests/requests").then(
                (m) => ({
                  Component: m.default,
                }),
              ),
          },
          {
            path: "consultation",
            lazy: () =>
              import("./pages/serviceProvidersDetails/pages/consultation/consultation").then(
                (m) => ({
                  Component: m.default,
                }),
              ),
          },
          {
            path: "wallet",
            lazy: () =>
              import("./pages/serviceProvidersDetails/pages/wallet/wallet").then(
                (m) => ({
                  Component: m.default,
                }),
              ),
          },
          {
            path: "invoices",
            lazy: () =>
              import("./pages/serviceProvidersDetails/pages/invoices/invoices").then(
                (m) => ({
                  Component: m.default,
                }),
              ),
          },
          {
            path: "reviews",
            lazy: () =>
              import("./pages/serviceProvidersDetails/pages/reviews/reviews").then(
                (m) => ({
                  Component: m.default,
                }),
              ),
          },
        ],
      },
    ],
  },
  {
    path: "reviews/:id",
  },
];

export const serviceProviderRoutePath = {
  SERVICE_PROVIDERS: "/admin/service-providers",
  REVIEW_PAGE: "/admin/service-providers/reviews/:id",
  SERVICE_PROVIDERS_DETAILS: (id: number) =>
    `/admin/service-providers/${id}/profile`,
  SERVICE_PROVIDERS_DETAILS_PROFILE: (id: number) =>
    `/admin/service-providers/${id}/profile`,
  SERVICE_PROVIDERS_DETAILS_SERVICES: (id: number) =>
    `/admin/service-providers/${id}/services`,
  SERVICE_PROVIDERS_DETAILS_REQUESTS: (id: number) =>
    `/admin/service-providers/${id}/requests`,
  SERVICE_PROVIDERS_DETAILS_CONSULTATION: (id: number) =>
    `/admin/service-providers/${id}/consultation`,
  SERVICE_PROVIDERS_DETAILS_WALLET: (id: number) =>
    `/admin/service-providers/${id}/wallet`,
  SERVICE_PROVIDERS_DETAILS_INVOICES: (id: number) =>
    `/admin/service-providers/${id}/invoices`,
  SERVICE_PROVIDERS_DETAILS_REVIEWS: (id: number) =>
    `/admin/service-providers/${id}/reviews`,
  SERVICE_PROVIDER_REVIEWS: (id: number) => `/admin/reviews/${id}`,
};
