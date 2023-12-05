import { useContext } from "react";
import { APIDataContext } from "../context/api-context";
import { TSocketEndpointNames, TSocketRequestPayload, TSocketResponseData } from "../types/api.types";

const useDerivAPI = () => {
    const context = useContext(APIDataContext);
    if (!context) {
        throw new Error("useAPI() must be used within APIProvider");
    }

    const { derivAPI } = context;

    const send = async <T extends TSocketEndpointNames>(
        name: T,
        payload?: TSocketRequestPayload<T>
    ): Promise<TSocketResponseData<T>> => {
        return derivAPI?.send({ [name]: 1, ...payload });
    };

    const subscribe = () => {};

    return { send, subscribe } as const;
};

export default useDerivAPI;
