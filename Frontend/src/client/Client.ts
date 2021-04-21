import BaseHttpClient, { TOptions, THeaders, BaseHttpError, TAfterRequestFn } from './BaseHttpClient';
import { noop, once } from '../utils/lodash';
import AuthUtils from '../utils/AuthUtils';

export class ClientError extends Error {
    name = 'ClientError';

    message: string;

    status: number;

    kind: string;

    datetime: string;

    // eslint-disable-next-line
    request_token: string;

    constructor(err: BaseHttpError) {
        super(err.message);
        const { status, decodedResponse } = err;

        this.status = status;
        this.kind = decodedResponse?.kind || '';
        this.datetime = decodedResponse?.datetime || '';
        this.message = decodedResponse?.message || '';
        // eslint-disable-next-line
        this.request_token = decodedResponse?.request_token || "";
    }
}

type TGlobalErrorHander = (err: ClientError, omitDefaultErrorHandling: boolean) => void;
type TGetAccessToken = () => string;
type TTryToUpdateAccessToken = () => Promise<any>;

const { doRequest } = BaseHttpClient.prototype;

class Client extends BaseHttpClient {
    protected getAccessToken: TGetAccessToken;

    protected tryToUpdateAccessToken: TTryToUpdateAccessToken;

    protected teardown() {
        for (const key in this.abortControllers) {
            this.abort(this.abortControllers[key]);
        }
    }

    protected hasAccessToken(): boolean {
        return Boolean(this.getAccessToken());
    }

    protected afterRequest: TAfterRequestFn = ({ url, options, err, isOwn, retryOriginRequest }) => {
        if (err && isOwn) {
            const newClientError = new ClientError(err);

            const emitErrors = () => {
                this.globalErrorHandler(newClientError, options.omitDefaultErrorHandling);
                throw newClientError;
            };

            if (newClientError.status === 401 && this.hasAccessToken()) {
                return this.tryToUpdateAccessToken()
                    .catch((err) => {
                        this.teardown();
                        emitErrors();
                    })
                    .then(() =>
                        retryOriginRequest({
                            headers: {
                                Authorization: `Bearer ${this.getAccessToken()}`
                            }
                        })
                    );
            }
            emitErrors();
        }
    };

    constructor(baseUrl: string, getAccessToken: TGetAccessToken, tryToUpdateAccessToken?: TTryToUpdateAccessToken) {
        super(baseUrl);
        this.getAccessToken = getAccessToken;
        this.tryToUpdateAccessToken = tryToUpdateAccessToken;
    }

    protected getOwnHeaders(): THeaders {
        return {
            Authorization: `Bearer ${this.getAccessToken()}`,
            pragma: 'no-cache',
            'Cache-Control': 'no-cache'
        };
    }

    protected globalErrorHandler: TGlobalErrorHander = noop;

    registerGlobalErrorHandler = once((handler: TGlobalErrorHander) => {
        this.globalErrorHandler = handler;
    });

    doRequest<T>(segmentUrl: string, options: TOptions = {}): Promise<T> {
        return doRequest.call(this, segmentUrl, options);
    }
}

const getAccessToken = async (): Promise<string> => {
    const { token } = await AuthUtils.getAuthMetadata();

    return token || '';
};

const getClient = async () => {
    const token = await getAccessToken();

    return new Client('https://dora.team/api/users/', () => token);
};

export default getClient;
