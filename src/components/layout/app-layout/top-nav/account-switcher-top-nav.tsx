import clsx from "clsx";
import DerivAccountSwitcher from "@deriv/quill-icons/branding/deriv-account-switcher.svg";
import DemoCurrencyCardIcon from "@deriv/quill-icons/currency/demo-card.svg";
import ChevronDownIcon from "@deriv/quill-icons/basic/chevron-down.svg";

export const AccountSwitcherTopNav = () => {
    return (
        <div className="relative inline-flex gap-400 items-center px-800 py-600">
            <DerivAccountSwitcher />
            <DemoCurrencyCardIcon />
            <div className="font-bold">0.00 USD</div>
            <span className="font-bold text-caption px-200 border-100 rounded-200">MALTA</span>
            <ChevronDownIcon />
            <div className="absolute flex flex-col top-2400 left-800 w-[320px] mt-400">
                <div className={clsx("font-bold text-body-lg p-500")}>Deriv Apps accounts</div>
            </div>
        </div>
    );
};
