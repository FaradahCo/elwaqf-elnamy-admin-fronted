import type { RouteObject } from "react-router";

const consultationRoutes: RouteObject[] = [
  {
    path:"",
    lazy: () =>
      import("./consultation").then((m) => ({
        Component: m.default,
      })),
    children:[
        {
        index:true,
        lazy: () =>
        import("./pages/consultationForm").then((m) => ({
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
