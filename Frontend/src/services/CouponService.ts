import Client from '../client/Client';
import { RequestMethod, ResponseType } from '../client/BaseHttpClient';

export const addNewCoupon = async (formDataCoupon) => {
    return Client.doRequest('warranties', { method: RequestMethod.POST, data: formDataCoupon });
};

export const fetchCategory = async () => {
    return Client.doRequest('https://dora.team/api/warranties/categories');
};

export const fetchCoupons = async (userId) => {
    return Client.doRequest(`${userId}/warranties`);
};
// TODO починить и отказаться от axios
// падает на response.arraybuffer();
export const fetchPhoto = async (fileUrl) => {
    return Client.doRequest(fileUrl, { responseType: ResponseType.ARRAY_BUFFER });
};

export const deleteCoupon = async (userId, warrantyId) => {
    return Client.doRequest('warranties', {
        data: { user_id: userId, warranty_id: warrantyId },
        method: RequestMethod.DELETE
    });
};

export const changeCoupon = async (userId, warrantyId, changeParams) => {
    return Client.doRequest('warranties', {
        data: { user_id: userId, warranty_id: warrantyId, ...changeParams },
        method: RequestMethod.PATCH
    });
};
