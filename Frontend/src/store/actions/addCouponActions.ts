import { AsyncStorage } from 'react-native';
import axios from '../../axios/axiosDora';
import { selectors as selectorsCoupon } from '../reducers/addCouponReducer';

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

    static cleanStore() {
        return { type: 'CLEAN_STORE' };
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

        return axios.post('/api/users/warranties', formDataCoupon, {
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

    static fetchPhoto = async (fileUrl) => {
        const token = await AsyncStorage.getItem('token');

        return axios.get(fileUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'arraybuffer'
        });
    };

    static deleteCoupon(userId, warrantyId) {
        return async (dispatch) => {
            dispatch({ type: 'START_DELETE_COUPON' });
            try {
                const token = await AsyncStorage.getItem('token');

                await axios.delete('/api/users/warranties', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: { user_id: userId, warranty_id: warrantyId }
                });
                dispatch({ type: 'SUCCESS_DELETE_COUPON' });
            } catch {
                dispatch({ type: 'ERROR_DELETE_COUPON' });
            }
        };
    }

    static changeCoupon(userId, warrantyId, changeParams) {
        return async (dispatch) => {
            dispatch({ type: 'START_CHANGE_COUPON' });
            try {
                const token = await AsyncStorage.getItem('token');

                const response = await axios.patch(
                    '/api/users/warranties',
                    { user_id: userId, warranty_id: warrantyId, ...changeParams },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(response);
                dispatch({ type: 'SUCCESS_CHANGE_COUPON' });
            } catch (err) {
                console.log(err.response.data);
                dispatch({ type: 'ERROR_CHANGE_COUPON' });
            }
        };
    }

    static searchCoupons(search) {
        return (dispatch, getState) => {
            const state = getState();
            const coupons = selectorsCoupon.coupons(state);
            const filterNonArchived = coupons.non_archived.filter((coupon) => coupon.name.includes(search));
            const filterArchived = coupons.archived.filter((coupon) => coupon.name.includes(search));
            const filterCoupons = {
                non_archived: filterNonArchived,
                archived: filterArchived
            };

            dispatch({
                type: 'FILTER_COUPONS',
                payload: {
                    filterCoupons
                }
            });
        };
    }
}
