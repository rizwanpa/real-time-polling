/* 
action type
*/
export const CREATE_POLL = 'CREATE_POLL';
export const GET_POLL = 'GET_POLL';
export const VIEW_POLLS = 'VIEW_POLLS';

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

export const getPoll = () => {
    return (dispatch) => {
        //API call
        const pollData = []
        dispatch(getPollAction({pollData}));
    }
}