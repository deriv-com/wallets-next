import { useReadLocalStorage } from "usehooks-ts";
import useQuery from "../lib/use-query";
import { LocalStorageConstants } from "../../utils";
import { TLoginInfo } from "../../utils/url.utils";
import { useMemo } from "react";

const useAuthorize = () => {
    const activeLoginid = useReadLocalStorage<keyof TLoginInfo>(LocalStorageConstants.activeLoginid);
    const accounts = useReadLocalStorage<TLoginInfo>(LocalStorageConstants.clientAccounts);
    const token = accounts?.[activeLoginid || ""]?.token || "";

    const { data, ...rest } = useQuery({ name: "authorize", payload: { authorize: token }, enabled: !!token });

    const modified_authorize = useMemo(() => ({ ...data?.authorize }), [data?.authorize]);

    return {
        data: modified_authorize,
        ...rest,
    };
};

export default useAuthorize;
