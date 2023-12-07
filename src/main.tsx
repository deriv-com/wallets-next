import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/app";
import APIProvider from "./api/context/api-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <APIProvider>
            <App />
        </APIProvider>
    </React.StrictMode>
);
