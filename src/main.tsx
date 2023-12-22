import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/app";
import APIProvider from "./api/context/api-context";
import AuthProvider from "./api/context/auth-context";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <APIProvider>
                <App />
            </APIProvider>
        </AuthProvider>
    </React.StrictMode>
);
