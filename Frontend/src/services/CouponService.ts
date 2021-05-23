import getClient from '../client/Client';
import { RequestMethod } from '../client/BaseHttpClient';

export const addNewCoupon = async (formDataCoupon) => {
    const client = await getClient();

    return client.doRequest('warranties', { method: RequestMethod.POST, data: formDataCoupon });
};

export const fetchCategory = async () => {
    const client = await getClient();

    return client.doRequest('https://dora.team/api/warranties/categories');
};

export const fetchCoupons = async (userId) => {
    const client = await getClient();

    return client.doRequest(`${userId}/warranties`);
};

export const fetchPhoto = async (fileUrl) => {
    const client = await getClient();

    // return client.doRequest(fileUrl, { responseType: ResponseType.ARRAY_BUFFER });
    return client.doRequest(fileUrl);
};

export const deleteCoupon = async (userId, warrantyId) => {
    const client = await getClient();

    return client.doRequest('warranties', {
        data: { user_id: userId, warranty_id: warrantyId },
        method: RequestMethod.DELETE
    });
};

export const changeCoupon = async (userId, warrantyId, changeParams) => {
    const client = await getClient();

    return client.doRequest('warranties', {
        data: { user_id: userId, warranty_id: warrantyId, ...changeParams },
        method: RequestMethod.PATCH
    });
};
