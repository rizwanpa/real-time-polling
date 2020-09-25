import { getData, postData } from "./../utills/utills";

/* 
action type
*/
export const GET_POLL_BY_UUID = "GET_POLL_BY_UUID";
export const SUBMIT_POLL_VOTE = "SUBMIT_POLL_VOTE";

/* 
action creators
*/

export const getPollByUuidAction = data => {
  return { type: GET_POLL_BY_UUID, data };
};
export const submitPollVoteAction = data => {
  return { type: SUBMIT_POLL_VOTE, data };
};

export const getPollByUuid = uuid => {
  return async dispatch => {
    //API call to fetch the poll details with uuid
    let pollDetails = await getData(`/submitvote/${uuid}`);
    const pollData = pollDetails.data ? pollDetails.data : [];
    dispatch(getPollByUuidAction({ pollData }));
  };
};

export const submitPollVote = voteObj => {
  return async dispatch => {
    //API call to submit  poll vote details.
    let voteResponse = await postData(`/submitpoll`, voteObj);
    let voteDetails = {};
    if (voteResponse.errorCode == 1) {
      voteDetails = {
        errorCode: voteResponse.errorCode,
        data: voteResponse.data ? voteResponse.data : {}
      };
    }else{
      voteDetails = {
        errorCode: 0,
        status: voteResponse.status,
        statusText: voteResponse.statusText,
        data: voteResponse.data ? voteResponse.data : {}
      };
      
    }
    //const pollData = voteResponse.data ? voteResponse.data : [];
    console.log('========submitPollVote------------>',JSON.stringify({ voteDetails }));
    dispatch(submitPollVoteAction({ voteDetails }));
  };
};
