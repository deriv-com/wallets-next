import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { LocalStorageUtils, URLUtils } from "../../utils";

type AuthData = {
    activeLoginid: string;
    switchAccount: (loginid: string) => void;
    getActiveAccount: () => URLUtils.AccountInfo | null | undefined;
};

export const AuthContext = createContext<AuthData | null>(null);

const getActiveLoginid = (loginInfo: URLUtils.AccountInfo[]) => {
    return loginInfo.find((acc) => /^VR/.test(acc.loginid))?.loginid || loginInfo[0].loginid;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [activeLoginid, setActiveLoginid] = useState(LocalStorageUtils.getValue("client.active_loginid") ?? "");
    const [accountList, setAccountList] = useState<URLUtils.AccountInfo[] | null>(
        LocalStorageUtils.getValue<URLUtils.AccountInfo[]>("client.account_list")
    );

    const switchAccount = useCallback(
        (loginid: string) => {
            if (loginid !== activeLoginid) {
                setActiveLoginid(loginid);
                LocalStorageUtils.setValue("client.active_loginid", loginid);
            }
        },
        [activeLoginid]
    );

    const getActiveAccount = () => {
        return accountList?.find((a) => a.loginid === activeLoginid);
    };

    useEffect(() => {
        const { loginInfo, paramsToDelete } = URLUtils.getLoginInfoFromURL();
        if (loginInfo?.length) {
            setAccountList(loginInfo);
            LocalStorageUtils.setValue("client.account_list", loginInfo);
            URLUtils.filterSearchParams(paramsToDelete);
            switchAccount(getActiveLoginid(loginInfo));
        }
    }, [switchAccount]);

    useEffect(() => {
        if (accountList?.length && !activeLoginid) {
            switchAccount(getActiveLoginid(accountList));
        }
    }, [accountList, activeLoginid, switchAccount]);

    return (
        <AuthContext.Provider value={{ activeLoginid, switchAccount, getActiveAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
