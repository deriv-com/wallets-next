import { RouteObject, createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/app-layout/app-layout";
import WalletsIndexPage from "../pages/wallets/wallets-index.page";

const routeConfig: RouteObject[] = [
    { path: "/", element: <AppLayout />, children: [{ element: <WalletsIndexPage />, index: true }] },
];

export const router = createBrowserRouter(routeConfig);
