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

export const getServerURL = () => {
    const configServerURL = window.localStorage.getItem(LocalStorageConstants.configServerURL);
    if (configServerURL) return configServerURL;

    const activeLoginid = getActiveLoginid();
    return ServerContants.environments[getEnvironmentFromLoginid(activeLoginid)];
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

export const getWebsocketURL = () => {
    const serverURL = getServerURL();
    const appId = getAppId();
    const language = window.localStorage.getItem(LocalStorageConstants.i18nLanguage);
    const brand = "deriv";

    return `wss://${serverURL}/websockets/v3?app_id=${appId}&l=${language}&brand=${brand}`;
};

export const getOauthURL = () => {
    return `https://oauth.deriv.com/oauth2/authorize?app_id=${getAppId()}&l=EN&brand=deriv`;
};
