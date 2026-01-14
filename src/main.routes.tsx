import { createBrowserRouter } from "react-router";
import { authenticationRoutes } from "./app/modules/authentication/authentication.routes";
import { pagesRoutes } from "./app/modules/pages/pages.routes";
import AuthProtectedRoute from "./app/guards/authProtected";
import ProtectedRoute from "./app/guards/ProtectedRoute";
import NotFound from "@shared/components/NotFound";
import RouterError from "@shared/components/RouterError";

const router = createBrowserRouter([
  {
    element: <AuthProtectedRoute />,
    children: [...authenticationRoutes],
    errorElement: <RouterError />,
  },
  {
    element: <ProtectedRoute />,
    children: [...pagesRoutes],
    errorElement: <RouterError />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
