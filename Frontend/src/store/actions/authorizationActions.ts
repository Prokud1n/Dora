import { AsyncStorage } from 'react-native';
import axios from '../../axios/axiosDora';
import { DispatchAction } from '../types';

export default class AuthorizationActions {
    static sendCodeToEmail(email, password): DispatchAction {
        return async (dispatch) => {
            dispatch({ type: 'SEND_EMAIL_CODE_START' });
            try {
                const response = await axios.post('/api/register/email', { email, password });

                const payload = {
                    auth: {
                        id: response.data.data.id,
                        varified: response.data.data.verified
                    }
                };

                await AsyncStorage.setItem('token', response.data.data.token);

                dispatch({ type: 'SEND_EMAIL_CODE_SUCCESS', payload });
            } catch {
                dispatch({ type: 'SEND_EMAIL_CODE_ERROR' });
            }
        };
    }

    static setEmailToStore(email) {
        return { type: 'SET_EMAIL_STORE', payload: { email } };
    }

    static activateAccount(userId, code): DispatchAction {
        return async (dispatch) => {
            dispatch({ type: 'ACTIVATE_ACCOUNT_START' });
            try {
                const token = await AsyncStorage.getItem('token');

                await axios.get(`/api/users/${userId}/verify/${code}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                dispatch({ type: 'ACTIVATE_ACCOUNT_SUCCESS' });
            } catch {
                dispatch({ type: 'ACTIVATE_ACCOUNT_ERROR' });
            }
        };
    }

    static signIn(email, password): DispatchAction {
        return async (dispatch) => {
            dispatch({ type: 'SIGN_IN_START' });
            try {
                const response = await axios.post('/api/auth/email', { email, password });

                const payload = {
                    auth: {
                        id: response.data.data.id,
                        varified: response.data.data.verified
                    }
                };

                await AsyncStorage.setItem('token', response.data.data.token);

                dispatch({ type: 'SIGN_IN_SUCCESS', payload });
            } catch {
                dispatch({ type: 'SIGN_IN_ERROR' });
            }
        };
    }
}
