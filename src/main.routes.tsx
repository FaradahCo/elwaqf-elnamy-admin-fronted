import { createBrowserRouter } from "react-router";
import NotFound from "./app/components/NotFound";
import AuthProtectedRoute from "./app/guards/authProtected";
import ProtectedRoute from "./app/guards/ProtectedRoute";
import { authenticationRoutes } from "./app/modules/authentication/authentication.routes";
import { pagesRoutes } from "./app/modules/pages/pages.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [...pagesRoutes],
  },
  {
    element: <AuthProtectedRoute />,
    children: [...authenticationRoutes],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
