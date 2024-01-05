import { useContext } from "react";
import { APIDataContext } from "../context/api-context";

export const useDerivAPI = () => {
    const context = useContext(APIDataContext);
    if (!context) {
        throw new Error("useAPI() must be used within APIProvider");
    }
    return context;
};
