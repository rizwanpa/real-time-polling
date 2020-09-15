import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import dashboardReducers from './dashboardReducers';
import userReducers from './userReducers'

export default (history) => combineReducers({
    router: connectRouter(history),
    dashboard : dashboardReducers,
    user : userReducers
});