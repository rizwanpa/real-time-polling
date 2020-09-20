import {getData} from './../utills/utills';

/* 
action type
*/
export const GET_POLL_BY_UUID = 'GET_POLL_BY_UUID';

/* 
action creators
*/

export const getPollByUuidAction = data =>{
    return { type: GET_POLL_BY_UUID, data}
}
export const getPollByUuid = (uuid) => {
    return async (dispatch) => {
        //API call to fetch the poll details with uuid
        let pollDetails = await getData(`/submitvote/${uuid}`);
        const pollData = (pollDetails.data) ? pollDetails.data : [];
        dispatch(getPollByUuidAction({pollData}));
    }
}