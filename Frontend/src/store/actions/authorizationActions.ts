import { AsyncStorage } from 'react-native';
import axios from '../../axios/axiosDora';

export default class AuthorizationActions {
    static sendCodeToEmail(email, password) {
        return axios.post('/api/register/email', { email, password });
    }

    static setEmailToStore(email) {
        return { type: 'SET_EMAIL_STORE', payload: { email } };
    }

    static activateAccount = async (userId, code) => {
        const token = await AsyncStorage.getItem('token');

        return axios.get(`/api/users/${userId}/verify/${code}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    static signIn(email, password) {
        return axios.post('/api/auth/email', { email, password });
    }

    static getCodeToEmail(email) {
        return axios.get(`/api/reset/${email}`);
    }
}
