import { Outlet } from "react-router-dom";
import { AppTopNavBar } from "./top-nav";
import { AppBottomNavBar } from "./app-bottom-navbar";

const AppLayout = () => {
    return (
        <div className="relative">
            <AppTopNavBar />
            <div className="mt-2400">
                <Outlet />
            </div>
            <AppBottomNavBar />
        </div>
    );
};

export default AppLayout;
