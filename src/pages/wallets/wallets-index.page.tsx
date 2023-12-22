import { useEffect } from "react";
import useExchangeRates from "../../api/base/use-exchange-rates";
import useSubscription from "../../api/lib/use-subscription";
import { getOauthURL } from "../../utils/websocket.utils";

const WalletsIndexPage = () => {
    const { isLoading: isR50Loading, data: data1, subscribe: subscribe1 } = useSubscription("ticks");
    const { isLoading: isBTCLoading, data: data2, subscribe: subscribe2 } = useSubscription("ticks");
    const isLoading = isR50Loading || isBTCLoading;

    const { data, subscribe: multiSubscribe, unsubscribe } = useExchangeRates();

    const unsubscribeHandler = () => {
        unsubscribe({ base_currency: "BTC", target_currencies: ["GBP", "ETH"] });
    };

    useEffect(() => {
        subscribe1({ ticks: "R_50" });
        subscribe2({ ticks: "cryBTCUSD" });
        multiSubscribe({ base_currency: "USD", target_currencies: ["BTC", "ETH"] });
        multiSubscribe({ base_currency: "GBP", target_currencies: ["BTC", "ETH"] });
        multiSubscribe({ base_currency: "BTC", target_currencies: ["GBP", "ETH"] });
    }, [multiSubscribe, subscribe1, subscribe2]);

    return (
        <div>
            <a href={getOauthURL()}>Login</a>
            <button onClick={unsubscribeHandler}>Unsubscribe</button>
            {isLoading ? (
                "Loading"
            ) : (
                <div>
                    <div>R50: {data1?.tick?.ask}</div>
                    <div>BTC: {data2?.tick?.ask}</div>
                    <div>{JSON.stringify(data)}</div>
                </div>
            )}
        </div>
    );
};

export default WalletsIndexPage;
