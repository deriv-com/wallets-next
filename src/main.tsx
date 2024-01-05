import React from "react";
import ReactDOM from "react-dom/client";
import { APIProvider } from "@deriv/api-hooks";
import { AuthProvider } from "./api/context/auth-context";
import "./styles/main.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/config.routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <APIProvider>
                <RouterProvider router={router} />
            </APIProvider>
        </AuthProvider>
    </React.StrictMode>
);
