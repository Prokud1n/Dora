import { createActionCreator, createReducer } from 'deox';
import { RootState } from '../store/reducers/rootReducer';

const sendCodeSuccess = createActionCreator('auth/sendCode [success]', (resolve) => (payload: { auth: Auth }) =>
    resolve(payload)
);
const sendCodeError = createActionCreator('auth/sendCode [error]');
const signInSuccess = createActionCreator('auth/signIn [success]', (resolve) => (payload: { auth: Auth }) =>
    resolve(payload)
);
const signInError = createActionCreator('auth/signIn [error]');

const saveEmail = createActionCreator('auth/saveEmail', (resolve) => (payload: string) => resolve(payload));
const saveCode = createActionCreator('auth/saveCode', (resolve) => (payload: string) => resolve(payload));

export const authActions = {
    sendCodeSuccess,
    sendCodeError,
    signInSuccess,
    signInError,
    saveEmail,
    saveCode
};

export const authSelectors = {
    userId: (state: RootState) => state.authorization.auth.id,
    email: (state: RootState) => state.authorization.auth.email,
    code: (state: RootState) => state.authorization.code
};

export type Auth = {
    id: number;
    verified: boolean;
    email: string;
};

export type AuthorizationAction = {
    type: string;
    payload?: Auth;
};

export type AuthorizationState = {
    auth: Auth;
    code: string;
};

const initialState = {
    auth: {
        id: null,
        verified: false,
        email: ''
    },
    code: ''
};

export default createReducer(initialState, (handleAction) => [
    handleAction(sendCodeSuccess, (state, { payload }) => ({
        ...state,
        ...payload
    })),
    handleAction(signInSuccess, (state, { payload }) => ({
        ...state,
        ...payload
    })),
    handleAction(saveEmail, (state, { payload }) => ({
        ...state,
        auth: {
            ...state.auth,
            email: payload
        }
    })),
    handleAction(saveCode, (state, { payload }) => ({
        ...state,
        code: payload
    }))
]);
