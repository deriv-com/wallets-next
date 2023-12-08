import { useState } from "react";
import {
    TSocketError,
    TSocketRequestPayload,
    TSocketResponseData,
    TSocketSubscribableEndpointNames,
} from "../types/api.types";
import useDerivAPI from "./use-deriv-api";

type TSubscriptionStatus = "idle" | "error" | "active" | "loading";

export const useSubscription = <T extends TSocketSubscribableEndpointNames>(name: T) => {
    const [data, setData] = useState<TSocketResponseData<T>>();
    const [error, setError] = useState<TSocketError<T>>();
    const { subscribe: _subscribe, unsubscribe: _unsubscribe } = useDerivAPI();
    const [subscriptionId, setSubscriptionId] = useState("");
    const [status, setStatus] = useState<TSubscriptionStatus>("loading");

    const subscribe = async (payload: TSocketRequestPayload<T>) => {
        const { id, subscription } = await _subscribe(name, payload);
        setSubscriptionId(id);
        subscription.subscribe((response) => {
            if (response.error) {
                setStatus("error");
                setError(response);
                return;
            }
            if (status === "loading") setStatus("active");
            return setData(response);
        });
    };

    const unsubscribe = () => {
        _unsubscribe(subscriptionId);
    };

    return {
        error,
        data,
        subscribe,
        unsubscribe,
        isLoading: status === "loading",
        isIdle: status === "idle",
        isActive: status === "active",
        isError: status === "error",
    } as const;
};

export default useSubscription;
