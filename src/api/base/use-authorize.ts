import { useMemo } from "react";
import { useQuery } from "../lib/use-query";
import { useAuthData } from "../lib/use-auth-data";

export const useAuthorize = () => {
    const { getActiveAccount } = useAuthData();
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
