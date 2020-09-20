import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import dashboardReducers from './dashboardReducers';
import userReducers from './userReducers';
import submitPollReducer from './submitPollReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    dashboard : dashboardReducers,
    user : userReducers,
    pollForVote : submitPollReducer
});