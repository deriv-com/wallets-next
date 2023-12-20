export type AccountInfo = { loginid: string; currency: string; token: string };

export const getLoginInfoFromURL = () => {
    const loginInfo: Partial<AccountInfo>[] = [];
    const paramsToDelete: string[] = [];
    const searchParams = new URLSearchParams(window.location.href);

    for (const [key, value] of searchParams.entries()) {
        const accountRegex = key.match(/acct(\d+)/);
        const tokenRegex = key.match(/token(\d+)/);
        const currencyRegex = key.match(/cur(\d+)/);

        if (accountRegex) {
            loginInfo[+accountRegex[1] - 1] = { ...(loginInfo[+accountRegex[1] - 1] || {}), loginid: value };
        }
        if (tokenRegex) {
            loginInfo[+tokenRegex[1] - 1] = { ...(loginInfo[+tokenRegex[1] - 1] || {}), token: value };
        }
        if (currencyRegex) {
            loginInfo[+currencyRegex[1] - 1] = {
                ...(loginInfo[+currencyRegex[1] - 1] || {}),
                currency: value,
            };
        }
        if (/acct/.test(key) || /token/.test(key) || /cur/.test(key)) paramsToDelete.push(key);
    }

    //paramsToDelete.forEach((p) => searchParams.delete(p));
    return loginInfo as AccountInfo[];
};
