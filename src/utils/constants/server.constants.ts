export const environments = {
    real: "green.derivws.com",
    demo: "blue.derivws.com",
} as const;

export const domainAppId = {
    "deriv.app": 16929,
    "app.deriv.com": 16929,
    "staging-app.deriv.com": 16303,
    "app.deriv.me": 1411,
    "staging-app.deriv.me": 1411,
    "app.deriv.be": 30767,
    "staging-app.deriv.be": 31186,
    "binary.com": 1,
    "test-app.deriv.com": 51072,
} as const;

/** You can insert your own App Id here */
export const userAppId = 0;
