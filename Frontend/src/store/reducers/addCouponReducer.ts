export type AddCouponState = {
    uri: string;
    checkedPhoto: any;
    photosGallery: any;
};

type AddCouponAction = {
    type: string;
    payload: {
        uri: string;
    };
};

const initialState = {
    uri: '',
    checkedPhoto: {},
    photosGallery: []
};

function addCouponReducer(state: AddCouponState = initialState, action: AddCouponAction) {
    switch (action.type) {
        case 'VIEW_PHOTO':
            return { ...state, ...action.payload };
        case 'UPDATE_CHECKED_PHOTO':
            return { ...state, ...action.payload };
        case 'SAVE_PHOTOS_GALLERY':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default addCouponReducer;
