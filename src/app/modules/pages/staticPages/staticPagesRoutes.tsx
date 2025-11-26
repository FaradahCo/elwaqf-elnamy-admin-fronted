import type { RouteObject } from "react-router";

export const staticPagesRoutes: RouteObject[] = [
  {
    index: true,
    lazy: () =>
      import("./pages/staticPagesList/staticPagesList").then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: "new-page",
    lazy: () =>
      import("./pages/staticPageForm/staticPageForm").then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: "edit/:id",
    lazy: () =>
      import("./pages/staticPageForm/staticPageForm").then((m) => ({
        Component: m.default,
      })),
  },
];

export const staticPagesRoutePath = {
  STATIC_PAGES_LIST: "/admin/static-pages",
  NEW_PAGE: "/admin/static-pages/new-page",
  EDIT_PAGE: "/admin/static-pages/edit/:id",
};
