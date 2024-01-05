import BriefcaseIcon from "@deriv/quill-icons/basic/briefcase.svg";

export const AppBottomNavBar = () => {
    return (
        <div className="fixed w-full inline-flex items-center h-1600 bottom-50 left-50 px-400 border-t-100 border-solid-slate-100">
            <BriefcaseIcon />
            <div className="inline-flex ml-auto">
                <div className="rounded-full bg-solid-green-900"></div>
            </div>
        </div>
    );
};
