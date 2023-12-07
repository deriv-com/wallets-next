import { useContext } from "react";
import { APIDataContext } from "../context/api-context";

const useDerivAPI = () => {
    const context = useContext(APIDataContext);
    if (!context) {
        throw new Error("useAPI() must be used within APIProvider");
    }
    return context;
};

export default useDerivAPI;
