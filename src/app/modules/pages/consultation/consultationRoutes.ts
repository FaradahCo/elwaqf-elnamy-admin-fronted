import type { RouteObject } from "react-router";

const consultationRoutes: RouteObject[] = [
  {
    path: "",
    lazy: () =>
      import("./Consultation").then((m) => ({
        Component: m.default,
      })),
    children: [
      {
        index: true,
        lazy: () =>
          import("./pages/ConsultationForm").then((m) => ({
            Component: m.default,
          })),
      },
    ],
  },
];

export default consultationRoutes;

export const consultationRoutePath = {
  CONSULTATION: "/admin/consultation",
};
