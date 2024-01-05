import ChevronDownIcon from "@deriv/quill-icons/basic/chevron-down.svg";
import BellIcon from "@deriv/quill-icons/basic/bell.svg";
import DerivAccountSwitcher from "@deriv/quill-icons/branding/deriv-account-switcher.svg";
import DemoCurrencyCardIcon from "@deriv/quill-icons/currency/demo-card.svg";
import DerivMenu from "@deriv/quill-icons/basic/deriv-menu.svg";
import DerivLogo from "@deriv/quill-icons/branding/deriv-logo.svg";
import DocumentLogo from "@deriv/quill-icons/basic/document.svg";
import DTraderLogo from "@deriv/quill-icons/branding/dtrader-logo.svg";
import ProfileIcon from "@deriv/quill-icons/basic/profile.svg";

const AppTopNavBar = () => {
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
                <div className="inline-flex gap-400 items-center px-800 py-600">
                    <DerivAccountSwitcher />
                    <DemoCurrencyCardIcon />
                    <div className="font-bold">0.00 USD</div>
                    <span className="font-bold text-caption px-200 border-100 rounded-200">MALTA</span>
                    <ChevronDownIcon />
                </div>
                <button className="bg-solid-coral-800 text-opacity-white-800 rounded-200 px-800 py-300 font-bold">
                    Manage Funds
                </button>
            </div>
        </nav>
    );
};

export default AppTopNavBar;
