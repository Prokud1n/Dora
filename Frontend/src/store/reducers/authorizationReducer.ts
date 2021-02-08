import { RootState } from './rootReducer';

export type Auth = {
    id: string;
    verified: boolean;
};

export type AuthorizationAction = {
    type: string;
    payload?: Auth;
};

export type AuthorizationState = {
    auth: Auth;
    email: string;
    code: string;
};

export const selectors = {
    userId: (state: RootState) => state.authorization.auth.id,
    email: (state: RootState) => state.authorization.email,
    code: (state: RootState) => state.authorization.code
};

const initialState = {
    auth: {
        id: '',
        verified: false
    },
    email: '',
    code: ''
};

function authorizationReducer(state: AuthorizationState = initialState, action: AuthorizationAction) {
    switch (action.type) {
        case 'SEND_EMAIL_CODE_SUCCESS':
            return { ...state, ...action.payload };
        case 'SIGN_IN_SUCCESS':
            return { ...state, ...action.payload };
        case 'SET_EMAIL_STORE':
            return { ...state, ...action.payload };
        case 'SET_CODE_STORE':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default authorizationReducer;
