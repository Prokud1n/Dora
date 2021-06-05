import { combineReducers } from 'redux';
import authorization, { AuthorizationState } from '../../ducks/auth';
import addCoupon, { AddCouponState } from './addCouponReducer';
import AuthUtils from '../../utils/AuthUtils';
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
            AuthUtils.clearAuthMetadata();
            state = undefined;
        }
        return appReducer(state, action);
    };
}
