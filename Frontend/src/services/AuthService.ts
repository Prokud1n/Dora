import getClient from '../client/Client';
import { RequestMethod } from '../client/BaseHttpClient';
import AuthUtils from '../utils/AuthUtils';

type Auth = { email: string; id: number; token: string; verified: boolean };

export const checkEmail = async (email) => {
    const client = await getClient();

    return client.doRequest(`email/availability/check/${email}`);
};

export const registration = async (email, password) => {
    const client = await getClient();

    return client.doRequest('register/email', { data: { email, password }, method: RequestMethod.POST });
};

export const activateAccount = async (userId, code) => {
    const client = await getClient();

    return client.doRequest('verify', { data: { user_id: userId, code }, method: RequestMethod.POST });
};

export const resetPassword = async (code, email, password) => {
    const client = await getClient();

    return client.doRequest('reset', { data: { code, email, password }, method: RequestMethod.POST });
};

export const checkCodeFromEmail = async (email, code) => {
    const client = await getClient();

    return client.doRequest(`reset/${email}/check/${code}`);
};

export const signIn = async (email, password) => {
    const client = await getClient();

    return client.doRequest<Auth>('auth/email', {
        data: { email, password },
        method: RequestMethod.POST
    });
};

export const sendCodeToEmailForResetPassword = async (email) => {
    const client = await getClient();

    return client.doRequest(`reset/${email}`);
};

export const sendCodeToEmailForActivateAccount = async (id) => {
    const client = await getClient();

    return client.doRequest(`${id}/verify/resend`);
};

export const changePassword = async ({ userId: user_id, oldPassword: old_password, newPassword: new_password }) => {
    const client = await getClient();

    return client.doRequest<Auth>('change/password/email', {
        data: {
            user_id,
            old_password,
            new_password
        },
        method: RequestMethod.POST
    });
};

export const checkToken = async () => {
    const client = await getClient();
    const { userId } = await AuthUtils.getAuthMetadata();

    return client.doRequest<{ email: string; id: number; verified: boolean }>(`${userId}/token/check`);
};

export const logout = async () => {
    const client = await getClient();
    const { userId } = await AuthUtils.getAuthMetadata();

    return client.doRequest('logout', { data: { user_id: userId }, method: RequestMethod.POST });
};
