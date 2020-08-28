import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import dashboard from './dashboardReducers'

export default (history) => combineReducers({
    router: connectRouter(history),
    dashboard
});