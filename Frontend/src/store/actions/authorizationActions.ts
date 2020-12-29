import { AsyncStorage } from 'react-native';
import axios from '../../axios/axiosDora';

export default class AuthorizationActions {
    static registration(email, password) {
        return axios.post('/api/users/register/email', { email, password });
    }

    static setEmailToStore(email) {
        return { type: 'SET_EMAIL_STORE', payload: { email } };
    }

    static setCodeToStore(code) {
        return { type: 'SET_CODE_STORE', payload: { code } };
    }

    static activateAccount = async (userId, code) => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        const { token } = JSON.parse(userInfo);

        return axios.get(`/api/users/${userId}/verify/${code}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    static resetPassword(code, email, password) {
        return axios.post('/api/users/reset', { code, email, password });
    }

    static checkCodeFromEmail(email, code) {
        return axios.get(`/api/users/reset/${email}/check/${code}`);
    }

    static signIn(email, password) {
        return axios.post('/api/users/auth/email', { email, password });
    }

    static sendCodeToEmailForResetPassword(email) {
        return axios.get(`/api/users/reset/${email}`);
    }

    static sendCodeToEmailForActivateAccount = async (id) => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        const { token } = JSON.parse(userInfo);

        return axios.get(`/api/users/${id}/verify/resend`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    static changePassword = async (user_id, old_password, new_password) => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        const { token } = JSON.parse(userInfo);

        return axios.post(
            '/api/users/change/password/email',
            {
                user_id,
                old_password,
                new_password
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    };

    static checkToken = async () => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        const { token, userId } = JSON.parse(userInfo);

        return axios.get(`/api/users/${userId}/token/check`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
}
