import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import authorization, { AuthorizationState } from './authorizationReducer';
import addCoupon, { AddCouponState } from './addCouponReducer';
import notifications, { NotificationState } from '../../ducks/notifications';

export type RootState = {
    authorization: AuthorizationState;
    addCoupon: AddCouponState;
    notifications: NotificationState;
};

export default function rootReducer() {
    const appReducer = combineReducers({
        authorization,
        addCoupon,
        notifications
    });

    return (state: RootState, action: any) => {
        if (action.type === 'LOGOUT') {
            AsyncStorage.clear();
            state = undefined;
        }
        return appReducer(state, action);
    };
}
