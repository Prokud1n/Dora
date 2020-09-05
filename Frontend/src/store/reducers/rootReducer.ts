import { combineReducers } from 'redux';
import authorization, { AuthorizationState } from './authorizationReducer';

export type RootState = {
    authorization: AuthorizationState;
};

export default combineReducers({
    authorization
});
