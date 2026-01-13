import { createBrowserRouter } from "react-router";
import { authenticationRoutes } from "./app/modules/authentication/authentication.routes";
import { pagesRoutes } from "./app/modules/pages/pages.routes";
import AuthProtectedRoute from "./app/guards/authProtected";
import ProtectedRoute from "./app/guards/ProtectedRoute";
import NotFound from "@shared/components/NotFound";

const router = createBrowserRouter([
  {
    element: <AuthProtectedRoute />,
    children: [...authenticationRoutes],
  },
  {
    element: <ProtectedRoute />,
    children: [...pagesRoutes],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
