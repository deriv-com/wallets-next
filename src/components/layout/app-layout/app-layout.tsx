import { Outlet } from "react-router-dom";
import AppTopNavBar from "./app-top-navbar";

const AppLayout = () => {
    return (
        <div className="">
            <AppTopNavBar />
            <Outlet />
        </div>
    );
};

export default AppLayout;
