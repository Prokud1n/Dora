import { combineReducers } from 'redux';
import authorization, { AuthorizationState } from './authorizationReducer';
import addCoupon, { AddCouponState } from './addCouponReducer';

export type RootState = {
    authorization: AuthorizationState;
    addCoupon: AddCouponState;
};

export default combineReducers({
    authorization,
    addCoupon
});
