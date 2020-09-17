import {postData,deleteData} from './../utills/utills';

/* 
action type
*/
export const CREATE_POLL = 'CREATE_POLL';
export const GET_POLL = 'GET_POLL';
export const VIEW_POLLS = 'VIEW_POLLS';
export const GET_POLL_ANALYTICS = 'GET_POLL_ANALYTICS';
export const TOGGLE_POLL = 'TOGGLE_POLL';
export const DELETE_POLL = 'DELETE_POLL';

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
export const togglePollAction = index =>{
    return { type: TOGGLE_POLL, index}
}
export const deletePollAction = data =>{
    return { type: DELETE_POLL, data}
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
        let pollData = await postData('/polls/getTopPolls',data);
        dispatch(getAnalyticAction(pollData.data));
    }
}

export const togglePoll = (index) => {
  return (dispatch) => {
    dispatch(togglePollAction(index));
  }
}
export const deletePoll = (uuid) => {
    return async (dispatch) => {
        let deletedPoll = await deleteData(`/polls/${uuid}`);
        console.log('deletedPoll_________',deletedPoll);
        dispatch(deletePollAction(deletedPoll.data));
    }
}