import { useMemo } from "react";
import useQuery from "../lib/use-query";
import useAuth from "../lib/use-auth";

const useAuthorize = () => {
    const { getActiveAccount } = useAuth();
    const activeAccount = getActiveAccount();
    const { data, ...rest } = useQuery({
        name: "authorize",
        payload: { authorize: activeAccount?.token || "" },
        enabled: !!activeAccount?.token,
    });

    const modified_authorize = useMemo(() => ({ ...data?.authorize }), [data?.authorize]);

    return {
        data: modified_authorize,
        ...rest,
    };
};

export default useAuthorize;
