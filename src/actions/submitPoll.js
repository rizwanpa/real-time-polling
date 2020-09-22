import {getData, postData} from './../utills/utills';

/* 
action type
*/
export const GET_POLL_BY_UUID = 'GET_POLL_BY_UUID';
export const SUBMIT_POLL_VOTE = 'SUBMIT_POLL_VOTE';

/* 
action creators
*/

export const getPollByUuidAction = data =>{
    return { type: GET_POLL_BY_UUID, data}
}
export const submitPollVoteAction = data =>{
    return { type: SUBMIT_POLL_VOTE, data}
}

export const getPollByUuid = (uuid) => {
    return async (dispatch) => {
        //API call to fetch the poll details with uuid
        let pollDetails = await getData(`/submitvote/${uuid}`);
        const pollData = (pollDetails.data) ? pollDetails.data : [];
        dispatch(getPollByUuidAction({pollData}));
    }
}

export const submitPollVote = (voteObj) => {
    return async (dispatch) => {
        //API call to submit  poll vote details.
        let pollDetails = await postData(`/submitpoll`,voteObj);
        const pollData = (pollDetails.data) ? pollDetails.data : [];
        dispatch(submitPollVoteAction({pollData}));
    }
}