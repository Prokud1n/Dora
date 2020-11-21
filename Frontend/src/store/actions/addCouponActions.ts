import { AsyncStorage } from 'react-native';
import axiosss from 'axios';
import axios from '../../axios/axiosDora';

export default class AddCouponActions {
    static viewPhoto(uri) {
        return { type: 'VIEW_PHOTO', payload: { uri } };
    }

    static updateCheckedPhoto(checkedPhoto) {
        return { type: 'UPDATE_CHECKED_PHOTO', payload: { checkedPhoto } };
    }

    static savePhotosGallery(photosGallery) {
        return { type: 'SAVE_PHOTOS_GALLERY', payload: { photosGallery } };
    }

    static saveInfoAboutPurchase({ couponName, shopName, dateOfPurchase, typeWarrantyPeriod, warrantyPeriod }) {
        return {
            type: 'SAVE_INFO_PURCHASE',
            payload: {
                infoPurchase: { couponName, shopName, dateOfPurchase, typeWarrantyPeriod, warrantyPeriod }
            }
        };
    }

    static saveInfoAboutCategory(infoCategory) {
        return {
            type: 'SAVE_INFO_CATEGORY',
            payload: {
                infoCategory
            }
        };
    }

    static fetchCategory() {
        return async (dispatch) => {
            dispatch({ type: 'FETCH_CATEGORY_START' });
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get('/api/warranties/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const payload = {
                    categories: response.data.data
                };

                dispatch({ type: 'FETCH_CATEGORY_SUCCESS', payload });
            } catch {
                dispatch({ type: 'FETCH_CATEGORY_ERROR' });
            }
        };
    }

    static addNewCoupon = async (formDataCoupon) => {
        const token = await AsyncStorage.getItem('token');

        return axiosss.post('https://e52f9ca67cdf.ngrok.io/api/users/warranties', formDataCoupon, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    static fetchCoupons(userId) {
        return async (dispatch) => {
            dispatch({ type: 'FETCH_COUPONS_START' });
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`/api/users/${userId}/warranties`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const payload = {
                    coupons: response.data.data
                };

                dispatch({ type: 'FETCH_COUPONS_SUCCESS', payload });
            } catch {
                dispatch({ type: 'FETCH_COUPONS_ERROR' });
            }
        };
    }
}
