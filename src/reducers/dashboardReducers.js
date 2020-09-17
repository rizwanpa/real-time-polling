import { defineState} from 'redux-localstore';
import { CREATE_POLL, GET_POLL, VIEW_POLLS, GET_POLL_ANALYTICS } from './../actions/index';

const defaultState = {
    polls : [],
    pollsAnalytics: []
}

const initialState = defineState(defaultState)('polls')
export default(state = initialState, actions) => {
    switch (actions.type){
        case GET_POLL_ANALYTICS :
        return {
            ...state,
            pollsAnalytics : actions.data
        }
        case CREATE_POLL :
        return {
            ...state
        }
        case GET_POLL :
        return {
            ...state
        }
        case VIEW_POLLS :
        return {
            ...state
        }
        default :
            return {
                ...state
            }
    }
}