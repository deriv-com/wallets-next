import { useQuery as _useQuery } from "@tanstack/react-query";
import { TSocketEndpointNames, TSocketError, TSocketRequestPayload, TSocketResponseData } from "../types/api.types";
import useDerivAPI from "./use-deriv-api";

type TSocketRequestQuery<T extends TSocketEndpointNames> = Parameters<
    typeof _useQuery<TSocketResponseData<T>, TSocketError<T>>
>[0] & {
    name: T;
    payload: TSocketRequestPayload<T>;
};

const useQuery = <T extends TSocketEndpointNames>({ name, payload, queryKey, ...rest }: TSocketRequestQuery<T>) => {
    const { send } = useDerivAPI();
    return _useQuery<TSocketResponseData<T>, TSocketError<T>>({
        queryKey: [name, ...queryKey],
        queryFn: () => send(name, payload),
        ...rest,
    });
};

export default useQuery;
