import client from '../client/Client';
import { RequestMethod } from '../client/BaseHttpClient';
import AuthUtils from '../utils/AuthUtils';

type Auth = { email: string; id: number; token: string; verified: boolean };

export const checkEmail = (email) => {
    return client.then((Client) => Client.doRequest(`email/availability/check/${email}`));
};

export const registration = async (email, password) => {
    return client.then((Client) =>
        Client.doRequest('register/email', { data: { email, password }, method: RequestMethod.POST })
    );
};

export const activateAccount = async (userId, code) => {
    return client.then((Client) =>
        Client.doRequest('verify', { data: { user_id: userId, code }, method: RequestMethod.POST })
    );
};

export const resetPassword = async (code, email, password) => {
    return client.then((Client) =>
        Client.doRequest('reset', { data: { code, email, password }, method: RequestMethod.POST })
    );
};

export const checkCodeFromEmail = async (email, code) => {
    return client.then((Client) => Client.doRequest(`reset/${email}/check/${code}`));
};

export const signIn = async (email, password) => {
    return client.then((Client) =>
        Client.doRequest<Auth>('auth/email', {
            data: { email, password },
            method: RequestMethod.POST
        })
    );
};

export const sendCodeToEmailForResetPassword = async (email) => {
    return client.then((Client) => Client.doRequest(`reset/${email}`));
};

export const sendCodeToEmailForActivateAccount = async (id) => {
    return client.then((Client) => Client.doRequest(`${id}/verify/resend`));
};

export const changePassword = async ({ userId: user_id, oldPassword: old_password, newPassword: new_password }) => {
    return client.then((Client) =>
        Client.doRequest<Auth>('change/password/email', {
            data: {
                user_id,
                old_password,
                new_password
            },
            method: RequestMethod.POST
        })
    );
};

export const checkToken = async () => {
    const { userId } = await AuthUtils.getAuthMetadata();

    return client.then((Client) =>
        Client.doRequest<{ email: string; id: number; verified: boolean }>(`${userId}/token/check`)
    );
};

export const logout = async () => {
    const { userId } = await AuthUtils.getAuthMetadata();

    return client.then((Client) =>
        Client.doRequest('logout', { data: { user_id: userId }, method: RequestMethod.POST })
    );
};
