import { createActionCreator, createReducer } from 'deox';
import { RootState } from '../store/reducers/rootReducer';

const addNotifications = createActionCreator('notifications/addNotifications', (resolve) => (payload: string) =>
    resolve(payload)
);
const removeNotifications = createActionCreator('notifications/removeNotifications');

export const notificationActions = {
    removeNotifications,
    addNotifications
};

export const selectors = {
    notifications: (state: RootState) => state.notifications.notifications
};

export type NotificationState = {
    notifications: string;
};

const initialState: NotificationState = {
    notifications: ''
};

export default createReducer(initialState, (handleAction) => [
    handleAction(addNotifications, (state, { payload }) => ({
        ...state,
        notifications: payload
    })),
    handleAction(removeNotifications, (state) => ({
        ...state,
        notifications: ''
    }))
]);
