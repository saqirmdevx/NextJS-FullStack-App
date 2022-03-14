export const enum StorageTypes {
    SESSION = "sessionStorage",
    LOCAL = "localStorage"
}

interface IUseStorageReturnValue {
    getItem: (key: string) => string;
    setItem: (key: string, value: string, type?: StorageTypes) => boolean;
    removeItem: (key: string) => void;
};

const useStorage = (): IUseStorageReturnValue => {
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

    const getStorageType = (type?: StorageTypes) => type ? type : StorageTypes.LOCAL;

    const getItem = (key: string): string => {
        /** Prioritize LocalStorage, if does not exists, check SessionStorage */
        if (!isBrowser)
            return "";

        let found = window[StorageTypes.LOCAL][key];
        
        if (!found)
            found = window[StorageTypes.SESSION][key];

        return found;
    };

    /* set storage data */
    const setItem = (key: string, value: string, type?: StorageTypes): boolean => {
        if (isBrowser) {
            window[getStorageType(type)].setItem(key, value);
            return true;
        }

        return false;
    };

    /* Clear Data from Local and Session storage **/
    const removeItem = (key: string): void => {
        window[StorageTypes.LOCAL].removeItem(key);
        window[StorageTypes.SESSION].removeItem(key);
    };

    return {
        getItem,
        setItem,
        removeItem,
    };
};

export default useStorage;