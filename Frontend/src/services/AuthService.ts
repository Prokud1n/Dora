import getClient from '../client/Client';

export const checkEmail = async (email) => {
    const client = await getClient();

    return client.doRequest(`email/availability/check/${email}`);
};
