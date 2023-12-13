import { useRef, useState } from "react";
import { TSocketRequestPayload, TSocketResponseData } from "../types/api.types";
import useDerivAPI from "../lib/use-deriv-api";

type TCurrencyPayload = NonNullable<TSocketRequestPayload<"exchange_rates">["target_currency"]>;
type TCurrencyRateData = NonNullable<TSocketResponseData<"exchange_rates">["exchange_rates"]>["rates"];

const useExchangeRates = <T extends TCurrencyPayload>() => {
    const { subscribe: _subscribe, unsubscribe: _unsubscribe } = useDerivAPI();
    const exchangeRatesSubscriptions = useRef<string[]>([]);
    const [data, setData] = useState<Record<TCurrencyPayload, TCurrencyRateData>>();

    const subscribe = async ({ base_currency, target_currencies }: { base_currency: T; target_currencies: T[] }) => {
        target_currencies.forEach(async (c) => {
            const { id, subscription } = await _subscribe("exchange_rates", { base_currency, target_currency: c });
            exchangeRatesSubscriptions.current.push(id);
            subscription.subscribe((response) => {
                const rates = response.exchange_rates?.rates;
                if (rates) {
                    setData((prev) => {
                        const currentData = { ...(prev || {}) };
                        if (currentData) {
                            currentData[base_currency] = { ...currentData[base_currency], ...rates };
                            return currentData;
                        }
                        return { [base_currency]: rates };
                    });
                }
            });
        });
    };

    const unsubscribe = () => {
        exchangeRatesSubscriptions.current.forEach((s) => _unsubscribe(s));
    };

    return { data, subscribe, unsubscribe };
};

export default useExchangeRates;
