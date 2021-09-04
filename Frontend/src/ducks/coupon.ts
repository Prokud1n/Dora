import { createActionCreator, createReducer } from 'deox';
import { MediaLibrary } from 'expo/build/removed.web';
import REQUEST, { REQUEST_TYPE } from '../constants/REQUEST';
import { RootState } from '../store/reducers/rootReducer';
import { getDateWithSplit } from '../utils/getFormatDate';
import * as CouponService from '../services/CouponService';

type TCheckedPhoto = { [key: string]: boolean };
export type TCategory = {
    category_id: number;
    category_name: string;
    type_warranty_period: string;
    warranty_period: number;
};

const updateCheckedPhoto = createActionCreator('coupon/updateCheckedPhoto', (resolve) => (payload: TCheckedPhoto) =>
    resolve(payload)
);

const savePhotoGallery = createActionCreator(
    'coupon/savePhotoGallery',
    (resolve) => (payload: MediaLibrary.PagedInfo<MediaLibrary.Asset>) => resolve(payload)
);

const saveInfoAboutPurchase = createActionCreator(
    'coupon/saveInfoAboutPurchase',
    (resolve) => (payload: {
        couponName: string;
        shopName: string;
        dateOfPurchase: string | null;
        typeWarrantyPeriod: string;
        warrantyPeriod: string;
    }) => resolve(payload)
);

const saveCategory = createActionCreator('coupon/saveCategory', (resolve) => (payload: TCategory) => resolve(payload));
const cleanStore = createActionCreator('coupon/cleanStore');

const fetchCategoryStart = createActionCreator('coupon/fetchCategory [start]');
const fetchCategorySuccess = createActionCreator(
    'coupon/fetchCategory [success]',
    (resolve) => (payload: TCategory[]) => resolve(payload)
);
const fetchCategoryError = createActionCreator('coupon/fetchCategory [error]');

function fetchCategory() {
    return async (dispatch) => {
        dispatch(fetchCategoryStart());
        try {
            const response = await CouponService.fetchCategory();

            dispatch(fetchCategorySuccess(response));
        } catch {
            dispatch(fetchCategoryError());
        }
    };
}

export const couponActions = {
    updateCheckedPhoto,
    savePhotoGallery,
    saveInfoAboutPurchase,
    saveCategory,
    cleanStore,
    fetchCategory
};

export type TCoupon = {
    category_id: number;
    date_end_expertise: string;
    date_of_purchase: string;
    days_end_warranty: number;
    date_end_warranty: string;
    expertise: boolean;
    files: { file_id: number; file_url: string }[];
    id: number;
    item_replaced: boolean;
    money_returned: boolean;
    name: string;
    shop_name: string;
};

export type AddCouponState = {
    checkedPhoto: TCheckedPhoto;
    photosGallery: any;
    infoPurchase: {
        couponName: string;
        shopName: string;
        dateOfPurchase: string;
        typeWarrantyPeriod: 'M' | 'Y' | 'D';
        warrantyPeriod: string;
    };
    infoCategory: TCategory;
    categories: TCategory[];
    coupons: {
        archived: TCoupon[];
        non_archived: TCoupon[];
    };
    filterCoupons: {
        archived: TCoupon[];
        non_archived: TCoupon[];
    };
    warrantyPhoto: {
        files: {
            file_id: number;
            file_url: string;
        }[];
        warrnaty_id: number;
    };
    requestStatusCoupons: REQUEST_TYPE;
};

export const selectors = {
    photosGallery: (state: RootState) => state.addCoupon.photosGallery,
    checkedPhoto: (state: RootState) => state.addCoupon.checkedPhoto,
    infoPurchase: (state: RootState) => state.addCoupon.infoPurchase,
    infoCategory: (state: RootState) => state.addCoupon.infoCategory,
    categories: (state: RootState) => state.addCoupon.categories,
    coupons: (state: RootState) => state.addCoupon.coupons,
    filterCoupons: (state: RootState) => state.addCoupon.filterCoupons,
    requestStatusCoupons: (state: RootState) => state.addCoupon.requestStatusCoupons
};

const initialState = {
    checkedPhoto: {},
    photosGallery: [],
    infoPurchase: {
        couponName: '',
        shopName: '',
        dateOfPurchase: null,
        warrantyPeriod: '100',
        typeWarrantyPeriod: 'месяцев'
    },
    infoCategory: {},
    categories: [],
    coupons: {
        archived: [],
        non_archived: []
    },
    filterCoupons: [],
    warrantyPhoto: {
        files: [],
        warranty_id: null
    },
    requestStatusCoupons: REQUEST.STILL
};

export default createReducer(initialState, (handleAction) => [
    handleAction(updateCheckedPhoto, (state, { payload }) => ({
        ...state,
        checkedPhoto: payload
    })),
    handleAction(savePhotoGallery, (state, { payload }) => ({
        ...state,
        photosGallery: [...state.photosGallery, ...payload]
    })),
    handleAction(saveInfoAboutPurchase, (state, { payload }) => ({
        ...state,
        infoPurchase: payload
    })),
    handleAction(saveCategory, (state, { payload }) => ({
        ...state,
        infoCategory: payload
    })),
    handleAction(fetchCategorySuccess, (state, { payload }) => ({
        ...state,
        categories: payload
    })),
    handleAction(cleanStore, () => ({
        ...initialState
    }))
]);
