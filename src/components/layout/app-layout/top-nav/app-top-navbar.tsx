import ChevronDownIcon from "@deriv/quill-icons/basic/chevron-down.svg";
import BellIcon from "@deriv/quill-icons/basic/bell.svg";
import DerivMenu from "@deriv/quill-icons/basic/deriv-menu.svg";
import DerivLogo from "@deriv/quill-icons/branding/deriv-logo.svg";
import DocumentLogo from "@deriv/quill-icons/basic/document.svg";
import DTraderLogo from "@deriv/quill-icons/branding/dtrader-logo.svg";
import ProfileIcon from "@deriv/quill-icons/basic/profile.svg";
import { AccountSwitcherTopNav } from "./account-switcher-top-nav";

export const AppTopNavBar = () => {
    return (
        <nav className="fixed top-50 left-50 w-full inline-flex h-2400 p-600 border-b-100 border-solid-slate-100">
            <div className="inline-flex items-center gap-1200">
                <DerivLogo />
                <DerivMenu />
                <div className="inline-flex items-center gap-400">
                    <DTraderLogo />
                    <ChevronDownIcon />
                </div>
                <div className="inline-flex items-center gap-400">
                    <DocumentLogo />
                    Reports
                </div>
            </div>
            <div className="inline-flex items-center gap-600 ml-auto">
                <BellIcon />
                <ProfileIcon />
                <AccountSwitcherTopNav />
                <button className="bg-solid-coral-800 text-opacity-white-800 rounded-200 px-800 py-300 font-bold">
                    Manage Funds
                </button>
            </div>
        </nav>
    );
};
