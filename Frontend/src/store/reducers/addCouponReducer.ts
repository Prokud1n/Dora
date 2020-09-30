export type AddCouponState = {
    uri: string;
    checkedPhoto: any[];
};

type AddCouponAction = {
    type: string;
    payload: {
        uri: string;
    };
};

const initialState = {
    uri: '',
    checkedPhoto: []
};

function addCouponReducer(state: AddCouponState = initialState, action: AddCouponAction) {
    if (action.type === 'VIEW_PHOTO') {
        return { ...state, ...action.payload };
    }
    if (action.type === 'UPDATE_CHECKED_PHOTO') {
        return { ...state, ...action.payload };
    }

    return state;
}

export default addCouponReducer;
