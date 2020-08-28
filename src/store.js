import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import storeSynchronize from 'redux-localstore';
import { createBrowserHistory} from 'history';
import { routerMiddleware } from 'connected-react-router';
import reducers from './reducers';
 
export const history = createBrowserHistory();

const middleWare = [ routerMiddleware(history), thunk];

const store = createStore(
    reducers(history),
    compose(
        applyMiddleware(...middleWare)
    )
);

export default store;
storeSynchronize(store)