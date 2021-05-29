import Client from '../client/Client';
import {RequestMethod} from '../client/BaseHttpClient';
import AuthUtils from '../utils/AuthUtils';

type Auth = { email: string; id: number; token: string; verified: boolean };

export const checkEmail = (email) => {
    return Client.doRequest(`email/availability/check/${email}`);
};

export const registration = async (email, password) => {
    return Client.doRequest('register/email', { data: { email, password }, method: RequestMethod.POST });
};

export const activateAccount = async (userId, code) => {
    return Client.doRequest('verify', { data: { user_id: userId, code }, method: RequestMethod.POST });
};

export const resetPassword = async (code, email, password) => {
    return Client.doRequest('reset', { data: { code, email, password }, method: RequestMethod.POST });
};

export const checkCodeFromEmail = async (email, code) => {
    return Client.doRequest(`reset/${email}/check/${code}`);
};

export const signIn = async (email, password) => {
    return Client.doRequest<Auth>('auth/email', {
        data: { email, password },
        method: RequestMethod.POST
    });
};

export const sendCodeToEmailForResetPassword = async (email) => {
    return Client.doRequest(`reset/${email}`);
};

export const sendCodeToEmailForActivateAccount = async (id) => {
    return Client.doRequest(`${id}/verify/resend`);
};

export const changePassword = async ({ userId: user_id, oldPassword: old_password, newPassword: new_password }) => {
    return Client.doRequest<Auth>('change/password/email', {
        data: {
            user_id,
            old_password,
            new_password
        },
        method: RequestMethod.POST
    });
};

export const checkToken = async () => {
    const { userId } = await AuthUtils.getAuthMetadata();

    return Client.doRequest<{ email: string; id: number; verified: boolean }>(`${userId}/token/check`);
};

export const logout = async () => {
    const { userId } = await AuthUtils.getAuthMetadata();

    return Client.doRequest('logout', { data: { user_id: userId }, method: RequestMethod.POST });
};
