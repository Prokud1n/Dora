import { RootState } from './rootReducer';

type Coupon = {
    category_id: number;
    date_of_purchase: string;
    id: number;
    name: string;
    shop_name: string;
    type_warranty_period: string;
    warranty_period: number;
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
    coupons: (state: RootState) => state.addCoupon.coupons
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
    coupons: {}
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
        case 'FETCH_COUPONS_SUCCESS':
            return { ...state, ...action.payload };
        case 'SAVE_INFO_CATEGORY':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default addCouponReducer;
