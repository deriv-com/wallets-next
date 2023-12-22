import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="">
            <h1 className="text-600 font-bold">Wallets</h1>
            <Outlet />
        </div>
    );
};

export default AppLayout;
