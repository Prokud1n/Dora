import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-native';
import getClient, { ClientError } from '../client/Client';
import * as AuthService from '../services/AuthService';

interface IState {
    err: ClientError | null;
}

const initialState: IState = {
    err: null
};

export default function useAppError() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [{ err }, setState] = useState(initialState);

    const handleError = () => {
        (async () => {
            const client = await getClient();

            client.registerGlobalErrorHandler((err: ClientError, omitDefaultErrorHandling) => {
                console.log('registerGlobalErrorHandler', err);
                if (err.status === 401) {
                    AuthService.logout().then(() => {
                        history.push('/authorization');
                        dispatch({ type: 'LOGOUT' });
                    });

                    return;
                }

                const omitError =
                    typeof omitDefaultErrorHandling === 'function'
                        ? omitDefaultErrorHandling(err)
                        : omitDefaultErrorHandling;

                if (!omitError) {
                    setState({ err });
                }
            });
        })();
    };

    useEffect(() => {
        handleError();
    }, []);

    const clearError = useCallback(() => setState({ err: null }), []);

    return {
        err,
        hasError: Boolean(err),
        clearError
    };
}
