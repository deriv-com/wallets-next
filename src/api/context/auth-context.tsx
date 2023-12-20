import { ReactNode, createContext, useEffect, useState } from "react";
import { LocalStorageUtils } from "../../utils";
import { AccountInfo, getLoginInfoFromURL } from "../../utils/url.utils";

type AuthData = {
    activeLoginid: string;
    handleSetActiveLoginid: (loginid: string) => void;
};

export const AuthContext = createContext<AuthData | null>(null);

type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [activeLoginid, setActiveLoginid] = useState(LocalStorageUtils.getValue("client.active_loginid") ?? "");
    const [accountList, setAccountList] = useState<AccountInfo[] | null | undefined>(
        LocalStorageUtils.getValue<AccountInfo[]>("client.account_list")
    );

    const handleSetActiveLoginid = (loginid: string) => setActiveLoginid(loginid);

    useEffect(() => {
        const loginInfo = getLoginInfoFromURL();
        if (loginInfo) {
            setAccountList(loginInfo);
        }
        if (!activeLoginid || activeLoginid === "undefined") {
            const virtualAccount = loginInfo?.find((a) => /VRTC/.test(a.loginid));
            const selectedAccount = virtualAccount?.loginid || loginInfo[0].loginid || "";
            setActiveLoginid(selectedAccount);
            LocalStorageUtils.setValue("client.active_loginid", selectedAccount);
        }
    }, [activeLoginid]);

    useEffect(() => {
        LocalStorageUtils.setValue("client.account_list", accountList);
    }, [accountList]);

    return <AuthContext.Provider value={{ activeLoginid, handleSetActiveLoginid }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
