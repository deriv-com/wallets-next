import { useEffect } from "react";
import useSingleSubscription from "../api/lib/use-single-subscription";
import useExchangeRates from "../api/base/use-exchange-rates";

const App = () => {
    const { isLoading: isR50Loading, data: data1, subscribe: subscribe1 } = useSingleSubscription("ticks");
    const { isLoading: isBTCLoading, data: data2, subscribe: subscribe2 } = useSingleSubscription("ticks");
    const isLoading = isR50Loading || isBTCLoading;

    const { data, subscribe: multiSubscribe } = useExchangeRates();

    useEffect(() => {
        subscribe1({ ticks: "R_50" });
        subscribe2({ ticks: "cryBTCUSD" });
        multiSubscribe("USD", ["BTC", "ETH"]);
        multiSubscribe("GBP", ["BTC", "ETH"]);
        multiSubscribe("BTC", ["GBP", "ETH"]);
    }, [multiSubscribe, subscribe1, subscribe2]);

    return (
        <div>
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

export default App;
