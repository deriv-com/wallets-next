import { LocalStorageConstants } from ".";

type TLocalStorageKeys = (typeof LocalStorageConstants)[keyof typeof LocalStorageConstants];

export const getValue = <T>(key: TLocalStorageKeys) => {
    const value = localStorage.getItem(key);
    if (!value || value === "null" || value === "undefined") return null;

    try {
        return JSON.parse(value) as T;
    } catch (e) {
        return null;
    }
};

export const setValue = <T>(key: TLocalStorageKeys, data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
};
