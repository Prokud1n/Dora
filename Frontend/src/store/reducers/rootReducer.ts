import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import authorization, { AuthorizationState } from './authorizationReducer';
import addCoupon, { AddCouponState } from './addCouponReducer';

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
            AsyncStorage.clear();
            state = undefined;
        }
        return appReducer(state, action);
    };
}
