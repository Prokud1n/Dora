import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import client, { ClientError } from '../client/Client';

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
        client.then((Client) =>
            Client.registerGlobalErrorHandler((err: ClientError, omitDefaultErrorHandling) => {
                if (err.status === 401) {
                    dispatch({ type: 'LOGOUT' });

                    return;
                }

                const omitError =
                    typeof omitDefaultErrorHandling === 'function'
                        ? omitDefaultErrorHandling(err)
                        : omitDefaultErrorHandling;

                if (!omitError) {
                    setState({ err });
                }
            })
        );
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
