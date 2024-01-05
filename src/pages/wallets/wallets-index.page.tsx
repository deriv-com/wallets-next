import { useEffect } from "react";
import { URLUtils } from "@deriv/utils";
import { useAuthorize } from "@deriv/api-hooks";
import { useExchangeRates } from "@deriv/api-hooks";
import { useSubscription } from "@deriv/api-hooks";

const WalletsIndexPage = () => {
    const { data: authorizeData } = useAuthorize();
    const { isLoading: isR50Loading, data: data1, subscribe: subscribe1 } = useSubscription("ticks");
    const { isLoading: isBTCLoading, data: data2, subscribe: subscribe2 } = useSubscription("ticks");
    const isLoading = isR50Loading || isBTCLoading;

    const { data: exchangeRateData, subscribe: multiSubscribe, unsubscribe } = useExchangeRates();

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
            <a href={URLUtils.getOauthURL()}>Login</a>
            <button onClick={unsubscribeHandler}>Unsubscribe</button>
            {isLoading ? (
                "Loading"
            ) : (
                <div>
                    <div>R50: {data1?.tick?.ask}</div>
                    <div>BTC: {data2?.tick?.ask}</div>
                    <div>{JSON.stringify(exchangeRateData)}</div>
                </div>
            )}
            <div>{JSON.stringify(authorizeData)}</div>
        </div>
    );
};

export default WalletsIndexPage;
