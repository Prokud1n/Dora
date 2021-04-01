import { AsyncStorage } from 'react-native';
import axios from '../../axios/axiosDora';
import { selectors as selectorsCoupon } from '../reducers/addCouponReducer';

export default class AddCouponActions {
    static updateCheckedPhoto(checkedPhoto) {
        return { type: 'UPDATE_CHECKED_PHOTO', payload: { checkedPhoto } };
    }

    static savePhotosGallery(photosGallery) {
        return { type: 'SAVE_PHOTOS_GALLERY', payload: photosGallery };
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
                const userInfo = await AsyncStorage.getItem('userInfo');
                const { token } = JSON.parse(userInfo);
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
        const userInfo = await AsyncStorage.getItem('userInfo');
        const { token } = JSON.parse(userInfo);

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
                const userInfo = await AsyncStorage.getItem('userInfo');
                const { token } = JSON.parse(userInfo);
                const response = await axios.get(`/api/users/${userId}/warranties`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const payload = {
                    coupons: response.data.data
                };

                dispatch({ type: 'FETCH_COUPONS_SUCCESS', payload });
            } catch (err) {
                console.log(err?.response?.data);
                const payload = {
                    coupons: {
                        archived: err.response.data.data,
                        non_archived: err.response.data.data
                    }
                };

                dispatch({ type: 'FETCH_COUPONS_ERROR', payload });
            }
        };
    }

    static fetchPhoto = async (fileUrl) => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        const { token } = JSON.parse(userInfo);

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
                const userInfo = await AsyncStorage.getItem('userInfo');
                const { token } = JSON.parse(userInfo);

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
        return async (dispatch, getState) => {
            dispatch({ type: 'START_CHANGE_COUPON' });
            try {
                const userInfo = await AsyncStorage.getItem('userInfo');
                const { token } = JSON.parse(userInfo);

                const response = await axios.patch(
                    '/api/users/warranties',
                    { user_id: userId, warranty_id: warrantyId, ...changeParams },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const state = getState();
                const newCoupon = response.data.data;
                const coupons = state.addCoupon.coupons.non_archived;
                const indexPrevCoupon = coupons.findIndex(({ id }) => id === newCoupon.id);

                coupons.splice(indexPrevCoupon, 1, newCoupon);
                dispatch({
                    type: 'SUCCESS_CHANGE_COUPON',
                    payload: {
                        non_archived: coupons
                    }
                });
            } catch (err) {
                console.log(err?.response?.data);
                dispatch({ type: 'ERROR_CHANGE_COUPON' });
            }
        };
    }

    static searchCoupons(search) {
        return (dispatch, getState) => {
            const state = getState();
            const coupons = selectorsCoupon.coupons(state);
            const handleSearch = (coupon) => coupon.name.toLowerCase().includes(search.toLowerCase());
            const filterNonArchived = coupons.non_archived.filter(handleSearch);
            const filterArchived = coupons.archived.filter(handleSearch);
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
