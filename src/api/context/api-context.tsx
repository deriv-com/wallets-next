import { createContext, PropsWithChildren, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// @ts-expect-error Deriv API is not typed
import DerivAPI from "@deriv/deriv-api/dist/DerivAPI";
import { getWebsocketURL } from "../../utils/websocket.utils";
import {
    TSocketEndpointNames,
    TSocketRequestPayload,
    TSocketResponseData,
    TSocketSubscribableEndpointNames,
} from "../types/api.types";
import { Observable, Subscription } from "rxjs";

const queryClient = new QueryClient();

type TSendFunction = <T extends TSocketEndpointNames>(
    name: T,
    payload?: TSocketRequestPayload<T>
) => Promise<TSocketResponseData<T>>;

type TSubscribeFunction = <T extends TSocketSubscribableEndpointNames>(
    name: T,
    payload?: TSocketRequestPayload<T>
) => { id: string; subscription: Observable<TSocketResponseData<T>> };

type TUnsubscribeFunction = (id: string) => void;

type APIData = {
    derivAPI: DerivAPI;
    send: TSendFunction;
    subscribe: TSubscribeFunction;
    unsubscribe: TUnsubscribeFunction;
};

export const APIDataContext = createContext<APIData | null>(null);

const APIProvider = ({ children }: PropsWithChildren) => {
    const derivAPI = useRef<DerivAPI>(new DerivAPI({ connection: new WebSocket(getWebsocketURL()) }));
    const subscriptions = useRef<Record<string, Subscription>>();

    const send: TSendFunction = (name, payload) => {
        return derivAPI.current?.send({ [name]: 1, ...payload });
    };

    const subscribe: TSubscribeFunction = (name, payload) => {
        const id = "";
        const subscription = derivAPI.current?.subscribe({ [name]: 1, subscribe: 1, ...(payload || {}) });

        return { id, subscription };
    };

    const unsubscribe: TUnsubscribeFunction = (id) => {
        const matchingSubscription = subscriptions.current?.[id];
        if (matchingSubscription) matchingSubscription.unsubscribe();
    };

    return (
        <APIDataContext.Provider value={{ derivAPI: derivAPI.current, send, subscribe, unsubscribe }}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </APIDataContext.Provider>
    );
};

export default APIProvider;
