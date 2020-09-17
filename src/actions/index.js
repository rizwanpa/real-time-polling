import {postData} from './../utills/utills';

/* 
action type
*/
export const CREATE_POLL = 'CREATE_POLL';
export const GET_POLL = 'GET_POLL';
export const VIEW_POLLS = 'VIEW_POLLS';
export const GET_POLL_ANALYTICS = 'GET_POLL_ANALYTICS';

/* 
action creators
*/

export const createPollAction = data =>{
    return { type: CREATE_POLL, data}
}
export const getPollAction = data =>{
    return { type: GET_POLL, data}
}
export const setPollAction = data =>{
    return { type: VIEW_POLLS, data}
}
export const getAnalyticAction = data =>{
    return { type: GET_POLL_ANALYTICS, data}
}

export const getPoll = () => {
    return (dispatch) => {
        //API call
        const pollData = []
        dispatch(getPollAction({pollData}));
    }
}

export const getPollAnalytics = (data) => {
    return async (dispatch) => {
        let pollData = await postData('/polls/getTopPolls');
        dispatch(getAnalyticAction(pollData.data));
    }
}