import { AsyncStorage, Platform } from 'react-native';

type AuthStorage = {
    token: string;
    userId?: string;
    email?: string;
};

const authKeys: AuthStorage = {
    token: null,
    userId: null,
    email: null
};

class AuthUtils {
    private prefix = '';

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    setAuthMetadata = async (data: AuthStorage) => {
        const dataKeys = Object.keys(data);

        for (const key of dataKeys) {
            if (!(key in authKeys)) {
                console.warn(`unexpected auth key ${key}`);
            } else {
                const value = data[key];

                if (value) {
                    await AsyncStorage.setItem(`${this.prefix}${key}`, JSON.stringify(value));
                }
            }
        }
    };

    getAuthMetadata = async () => {
        const out = {} as AuthStorage;
        const dataKeys = Object.keys(authKeys);

        for (const key of dataKeys) {
            const value = await AsyncStorage.getItem(`${this.prefix}${key}`);

            try {
                out[key] = JSON.parse(value);
            } catch (e) {
                out[key] = value;
            }
        }

        return out;
    };

    clearAuthMetadata = async () => {
        await AsyncStorage.clear();
        const asyncStorageKeys = await AsyncStorage.getAllKeys();

        if (asyncStorageKeys.length > 0) {
            if (Platform.OS === 'android') {
                await AsyncStorage.clear();
            }
            if (Platform.OS === 'ios') {
                await AsyncStorage.multiRemove(asyncStorageKeys);
            }
        }
    };
}

export default new AuthUtils('');
