import { ThunkAction } from 'redux-thunk';
import AuthorizationActions from './actions/authorizationActions';
import { RootState } from './reducers/rootReducer';

type Action = AuthorizationActions;

export type DispatchAction<T = void> = ThunkAction<Promise<T>, RootState, void, Action>;
