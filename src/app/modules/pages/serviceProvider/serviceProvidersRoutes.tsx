import type { RouteObject } from "react-router";

export const ServiceProviderRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () =>
      import("./pages/serviceProvidersList/serviceProvidersList").then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: "reviews/:id",
    lazy: () =>
      import("./pages/reviewPage").then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: ":id",
    lazy: () =>
      import("./pages/serviceProvidersDetails/serviceProviderDetails").then(
        (m) => ({
          Component: m.default,
        }),
      ),
  },
];

export const serviceProviderRoutePath = {
  SERVICE_PROVIDERS: "/admin/service-providers",
  REVIEW_PAGE: "/admin/service-providers/reviews/:id",
  SERVICE_PROVIDERS_DETAILS: (id: number) => `/admin/service-providers/${id}`,
};
