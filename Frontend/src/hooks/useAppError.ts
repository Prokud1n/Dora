import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Client, { ClientError } from '../client/Client';

type State = {
    err: ClientError | null;
};

const initialState: State = {
    err: null
};

export default function useAppError() {
    const dispatch = useDispatch();
    const [{ err }, setState] = useState(initialState);

    const handleError = () => {
        Client.registerGlobalErrorHandler((err: ClientError, omitDefaultErrorHandling) => {
            const omitError =
                typeof omitDefaultErrorHandling === 'function'
                    ? omitDefaultErrorHandling(err)
                    : omitDefaultErrorHandling;

            if (!omitError) {
                setState({ err });
            }

            if (err.status === 401) {
                dispatch({ type: 'LOGOUT' });
            }
        });
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
