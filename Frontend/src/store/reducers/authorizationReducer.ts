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
    email: string;
    code: string;
};

const initialState = {
    auth: {
        id: '',
        varified: false
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
