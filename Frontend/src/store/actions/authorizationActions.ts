import { AsyncStorage } from 'react-native';
import axios from '../../axios/axiosDora';

export default class AuthorizationActions {
    static registration(email, password) {
        return axios.post('/api/register/email', { email, password });
    }

    static setEmailToStore(email) {
        return { type: 'SET_EMAIL_STORE', payload: { email } };
    }

    static setCodeToStore(code) {
        return { type: 'SET_CODE_STORE', payload: { code } };
    }

    static activateAccount = async (userId, code) => {
        const token = await AsyncStorage.getItem('token');

        return axios.get(`/api/users/${userId}/verify/${code}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    static resetPassword(code, email, password) {
        return axios.post('/api/reset', { code, email, password });
    }

    static checkCodeFromEmail(email, code) {
        return axios.get(`/api/reset/${email}/check/${code}`);
    }

    static signIn(email, password) {
        return axios.post('/api/auth/email', { email, password });
    }

    static sendCodeToEmailForResetPassword(email) {
        return axios.get(`/api/reset/${email}`);
    }

    static sendCodeToEmailForActivateAccount = async (id) => {
        const token = await AsyncStorage.getItem('token');

        return axios.get(`/api/users/${id}/verify/resend`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
}
