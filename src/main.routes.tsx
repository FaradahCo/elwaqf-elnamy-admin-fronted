import { createBrowserRouter } from "react-router";
import { authenticationRoutes } from "./app/modules/authentication/authentication.routes";
import { clientRoutes } from "./app/modules/client/clientRoutes";
import { providerRoutes } from "./app/modules/provider/provider.routes";

const router = createBrowserRouter([
  ...clientRoutes,
  ...providerRoutes,
  ...authenticationRoutes,
]);

export default router;
