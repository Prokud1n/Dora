export default class AuthorizationActions {
    static setEmailToStore(email) {
        return { type: 'SET_EMAIL_STORE', payload: { email } };
    }

    static setCodeToStore(code) {
        return { type: 'SET_CODE_STORE', payload: { code } };
    }
}
