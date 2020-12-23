import { RootState } from './rootReducer';
import REQUEST, { REQUEST_TYPE } from '../../constants/REQUEST';

export type Coupon = {
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
    uri: string;
    checkedPhoto: any;
    photosGallery: any;
    infoPurchase: {
        couponName: string;
        shopName: string;
        dateOfPurchase: number;
        typeWarrantyPeriod: 'M' | 'Y' | 'D';
        warrantyPeriod: string;
    };
    infoCategory: {
        category_id: number;
        category_name: string;
        type_warranty_period: string;
        warranty_period: number;
    };
    categories: {
        category_id: number;
        category_name: string;
        type_warranty_period: string;
        warranty_period: number;
    }[];
    coupons: {
        archived: Coupon[];
        non_archived: Coupon[];
    };
    filterCoupons: {
        archived: Coupon[];
        non_archived: Coupon[];
    };
    warrantyPhoto: {
        files: {
            file_id: number;
            file_url: string;
        }[];
        warrnaty_id: number;
    };
    photo: string;
    requestStatusCoupons: REQUEST_TYPE;
};

type AddCouponAction = {
    type: string;
    payload: {
        uri: string;
    };
};

export const selectors = {
    photosGallery: (state: RootState) => state.addCoupon.photosGallery,
    checkedPhoto: (state: RootState) => state.addCoupon.checkedPhoto,
    infoPurchase: (state: RootState) => state.addCoupon.infoPurchase,
    infoCategory: (state: RootState) => state.addCoupon.infoCategory,
    categories: (state: RootState) => state.addCoupon.categories,
    coupons: (state: RootState) => state.addCoupon.coupons,
    filterCoupons: (state: RootState) => state.addCoupon.filterCoupons,
    photo: (state: RootState) => state.addCoupon.photo,
    requestStatusCoupons: (state: RootState) => state.addCoupon.requestStatusCoupons
};

const initialState = {
    uri: '',
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
    photo: '',
    requestStatusCoupons: REQUEST.STILL
};

function addCouponReducer(state: AddCouponState = initialState, action: AddCouponAction) {
    switch (action.type) {
        case 'VIEW_PHOTO':
            return { ...state, ...action.payload };
        case 'UPDATE_CHECKED_PHOTO':
            return { ...state, ...action.payload };
        case 'SAVE_PHOTOS_GALLERY':
            return { ...state, ...action.payload };
        case 'SAVE_INFO_PURCHASE':
            return { ...state, ...action.payload };
        case 'FETCH_CATEGORY_SUCCESS':
            return { ...state, ...action.payload };
        case 'FETCH_COUPONS_START':
            return { ...state, requestStatusCoupons: REQUEST.LOADING };
        case 'FETCH_COUPONS_SUCCESS':
            return { ...state, ...action.payload, requestStatusCoupons: REQUEST.STILL };
        case 'FETCH_COUPONS_ERROR':
            return { ...state, requestStatusCoupons: REQUEST.ERROR };
        case 'FETCH_WARRANTY_PHOTO_SUCCESS':
            return { ...state, ...action.payload };
        case 'FETCH_PHOTO_SUCCESS':
            return { ...state, ...action.payload };
        case 'SAVE_INFO_CATEGORY':
            return { ...state, ...action.payload };
        case 'FILTER_COUPONS':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default addCouponReducer;
