import { useState } from "react";
import { TSocketRequestPayload } from "../types/api.types";
import useDerivAPI from "../lib/use-deriv-api";

type TCurrencyPayload = NonNullable<TSocketRequestPayload<"exchange_rates">["target_currency"]>;

const useExchangeRates = <T extends TCurrencyPayload>() => {
    const { subscribe: _subscribe } = useDerivAPI();
    const [status, setStatus] = useState;

    const subscribe = async (base_currency: T, target_currencies: T[]) => {
        target_currencies.forEach(async (c) => {
            const { id, subscription } = await _subscribe("exchange_rates", { base_currency, target_currency: c });
        });
    };
};

export default useExchangeRates;
