import { useMemo } from "react";
import useQuery from "../lib/use-query";

const useAuthorize = () => {
    const { data, ...rest } = useQuery({ name: "authorize", payload: { authorize: token }, enabled: !!token });

    const modified_authorize = useMemo(() => ({ ...data?.authorize }), [data?.authorize]);

    return {
        data: modified_authorize,
        ...rest,
    };
};

export default useAuthorize;
