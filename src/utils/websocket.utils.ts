import { LocalStorageConstants, ServerContants } from ".";

export const getActiveLoginid = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlActiveLoginid = urlSearchParams.get("acct1");
    return window.localStorage.getItem(LocalStorageConstants.activeLoginid) || urlActiveLoginid;
};

export const getEnvironmentFromLoginid = (loginid: string | null) => {
    if (loginid && !/^VR/.test(loginid)) return "real";
    return "demo";
};

export const getAppId = () => {
    if (ServerContants.userAppId) return ServerContants.userAppId;

    const configAppId = window.localStorage.getItem(LocalStorageConstants.configAppId);
    if (configAppId) return configAppId;

    const currentDomain = window.location.hostname;
    const domainAppId = ServerContants.domainAppId[currentDomain as keyof typeof ServerContants.domainAppId];
    if (domainAppId) return domainAppId;

    return 36300;
};
