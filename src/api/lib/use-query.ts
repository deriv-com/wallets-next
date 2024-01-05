import { useQuery as _useQuery } from "@tanstack/react-query";
import { TSocketEndpointNames, TSocketError, TSocketRequestPayload, TSocketResponseData } from "../types/api.types";
import { useDerivAPI } from "./use-deriv-api";

type TSocketRequestQuery<T extends TSocketEndpointNames> = Omit<
    Parameters<typeof _useQuery<TSocketResponseData<T>, TSocketError<T>>>[0],
    "queryKey"
> & {
    name: T;
    payload?: TSocketRequestPayload<T>;
    queryKey?: string[];
};

export const useQuery = <T extends TSocketEndpointNames>({
    name,
    payload,
    queryKey,
    ...rest
}: TSocketRequestQuery<T>) => {
    const { send } = useDerivAPI();

    return _useQuery<TSocketResponseData<T>, TSocketError<T>>({
        queryKey: [name, ...(queryKey ?? [])],
        queryFn: () => send(name, payload),
        ...rest,
    });
};
