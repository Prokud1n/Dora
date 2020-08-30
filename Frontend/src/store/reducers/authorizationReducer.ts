import REQUEST from '../../constants/REQUEST';

export type Auth = {
    id: string;
    varified: boolean;
};

export type AuthorizationAction = {
    type: string;
    payload?: Auth;
};

export type AuthorizationState = {
    auth: Auth;
    requestStatus: number;
    email: string;
};

const initialState = {
    auth: {
        id: '',
        varified: false
    },
    requestStatus: REQUEST.STILL,
    email: ''
};

function authorizationReducer(state: AuthorizationState = initialState, action: AuthorizationAction) {
    switch (action.type) {
        case 'SEND_EMAIL_CODE_START':
            return { ...state, requestStatus: REQUEST.LOADING };
        case 'SEND_EMAIL_CODE_SUCCESS':
            return { ...state, ...action.payload, requestStatus: REQUEST.STILL };
        case 'SEND_EMAIL_CODE_ERROR':
            return { ...state, requestStatus: REQUEST.ERROR };
        case 'ACTIVATE_ACCOUNT_START':
            return { ...state, requestStatus: REQUEST.LOADING };
        case 'ACTIVATE_ACCOUNT_SUCCESS':
            return { ...state, requestStatus: REQUEST.STILL };
        case 'ACTIVATE_ACCOUNT_ERROR':
            return { ...state, requestStatus: REQUEST.ERROR };
        case 'SIGN_IN_START':
            return { ...state, requestStatus: REQUEST.LOADING };
        case 'SIGN_IN_SUCCESS':
            return { ...state, ...action.payload, requestStatus: REQUEST.STILL };
        case 'SIGN_IN_ERROR':
            return { ...state, requestStatus: REQUEST.ERROR };
        case 'SET_EMAIL_STORE':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default authorizationReducer;
