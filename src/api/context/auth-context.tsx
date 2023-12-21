import { ReactNode, createContext, useEffect, useState } from "react";
import { LocalStorageUtils, URLUtils } from "../../utils";

type AuthData = {
    activeLoginid: string;
    switchAccount: (loginid: string) => void;
    getActiveAccount: () => URLUtils.AccountInfo | null | undefined;
};

export const AuthContext = createContext<AuthData | null>(null);

type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [activeLoginid, setActiveLoginid] = useState(LocalStorageUtils.getValue("client.active_loginid") ?? "");
    const [accountList, setAccountList] = useState<URLUtils.AccountInfo[] | null>(
        LocalStorageUtils.getValue<URLUtils.AccountInfo[]>("client.account_list")
    );

    const switchAccount = (loginid: string) => {
        if (loginid !== activeLoginid) {
            setActiveLoginid(loginid);
        }
    };

    const getActiveAccount = () => {
        return accountList?.find((a) => a.loginid === activeLoginid);
    };

    useEffect(() => {
        const { loginInfo, paramsToDelete } = URLUtils.getLoginInfoFromURL();
        if (loginInfo?.length) {
            setAccountList(loginInfo);
            LocalStorageUtils.setValue("client.account_list", loginInfo);
            URLUtils.filterSearchParams(paramsToDelete);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ activeLoginid, switchAccount, getActiveAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
