import { createBrowserRouter } from "react-router-dom";
import ErrorBoundaryFallback from "../pages/error-boundary-fallback/ErrorBoundaryFallback";
import Login from "../pages/login/Login";
import ItemNotFound from "@/components/ui/item-not-found/ItemNotFound";
import HexGenerator from "../pages/hex-generator/HexGenerator";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundaryFallback />,
  },
  {
    path: "/generation",
    element: <HexGenerator />,
    errorElement: <ErrorBoundaryFallback />,
  },
  {
    path: "*",
    element: <ItemNotFound item="page" />,
  },
]);

export default routes;
