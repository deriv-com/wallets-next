import { useEffect } from "react";
import useSingleSubscription from "../api/lib/use-single-subscription";

const App = () => {
    const { isLoading: isR50Loading, data: data1, subscribe: subscribe1 } = useSingleSubscription("ticks");
    const { isLoading: isBTCLoading, data: data2, subscribe: subscribe2 } = useSingleSubscription("ticks");
    const isLoading = isR50Loading || isBTCLoading;

    useEffect(() => {
        subscribe1({ ticks: "R_50" });
        subscribe2({ ticks: "cryBTCUSD" });
    }, [subscribe1, subscribe2]);

    return (
        <div>
            {isLoading ? (
                "Loading"
            ) : (
                <div>
                    <div>R50: {data1?.tick?.ask}</div>
                    <div>BTC: {data2?.tick?.ask}</div>
                </div>
            )}
        </div>
    );
};

export default App;
