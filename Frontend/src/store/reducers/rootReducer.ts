import { combineReducers } from 'redux';
import authorization, { AuthorizationState } from './authorizationReducer';
import addCoupon, { AddCouponState } from './addCouponReducer';
import AuthUtils from '../../utils/AuthUtils';

export type RootState = {
    authorization: AuthorizationState;
    addCoupon: AddCouponState;
};

export default function rootReducer() {
    const appReducer = combineReducers({
        authorization,
        addCoupon
    });

    return (state: RootState, action: any) => {
        if (action.type === 'LOGOUT') {
            AuthUtils.clearAuthMetadata();
            state = undefined;
        }
        return appReducer(state, action);
    };
}
