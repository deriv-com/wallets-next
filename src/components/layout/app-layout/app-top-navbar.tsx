import ChevronDownIcon from "../../../assets/icons/basic/chevron-down.svg";
import BellIcon from "../../../assets/icons/basic/bell.svg";
import DerivAccountSwitcher from "../../../assets/icons/branding/deriv-account-switcher.svg";
import DemoCurrencyCardIcon from "../../../assets/icons/currency/demo-card.svg";
import DerivMenu from "../../../assets/icons/basic/deriv-menu.svg";
import DerivLogo from "../../../assets/icons/branding/deriv-logo.svg";
import DocumentLogo from "../../../assets/icons/basic/document.svg";
import DTraderLogo from "../../../assets/icons/branding/dtrader-logo.svg";
import ProfileIcon from "../../../assets/icons/basic/profile.svg";

const AppTopNavBar = () => {
    return (
        <nav className="w-full inline-flex h-48 p-600">
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
            <div className="inline-flex items-center ml-auto">
                <BellIcon />
                <ProfileIcon />
                <div className="inline-flex items-center">
                    <DerivAccountSwitcher />
                    <div className="w-2200">
                        <DemoCurrencyCardIcon />
                    </div>
                </div>
                <div className="">0.00 USD</div>
                <span className="font-bold text-body-sm">MALTA</span>
                <ChevronDownIcon />
                <button className="bg-solid-coral-800 text-opacity-white-800 rounded-200 px-800 py-400 font-bold text-body-md">
                    Manage Funds
                </button>
            </div>
        </nav>
    );
};

export default AppTopNavBar;
