import { createContext, PropsWithChildren, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// @ts-expect-error Deriv API is not typed
import DerivAPI from "@deriv/deriv-api/dist/DerivAPI";
import { getWebsocketURL } from "../../utils/websocket.utils";

const queryClient = new QueryClient();

type APIData = {
    derivAPI: DerivAPI;
};

export const APIDataContext = createContext<APIData | null>(null);

const APIProvider = ({ children }: PropsWithChildren) => {
    const derivAPI = useRef<DerivAPI>(new DerivAPI({ connection: new WebSocket(getWebsocketURL()) }));

    return (
        <APIDataContext.Provider value={{ derivAPI: derivAPI.current }}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </APIDataContext.Provider>
    );
};

export default APIProvider;
