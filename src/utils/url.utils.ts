export type TLoginInfo = { [key: string]: { currency: string; token: string } };

export const getLoginInfoFromURL = () => {
    const loginInfo: TLoginInfo = {};
    const paramsToDelete: string[] = [];
    const searchParams = new URLSearchParams(window.location.href);

    for (const [key, value] of searchParams.entries()) {
        const keys = Object.keys(loginInfo);
        const currentKey = keys[keys.length - 1];

        if (/acct/.test(key)) {
            loginInfo[value] = { currency: "", token: "" };
        }
        if (/token/.test(key)) {
            loginInfo[currentKey] = { ...loginInfo[currentKey], token: value };
        }
        if (/cur/.test(key)) {
            loginInfo[currentKey] = { ...loginInfo[currentKey], currency: value };
        }
        if (/acct/.test(key) || /token/.test(key) || /cur/.test(key)) paramsToDelete.push(key);
    }

    paramsToDelete.forEach((p) => searchParams.delete(p));
    return loginInfo;
};
