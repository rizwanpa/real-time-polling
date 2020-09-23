import { postData, deleteData, getData, updateData } from './../utills/utills';

/* 
action type
*/
export const CREATE_POLL = 'CREATE_POLL';
export const GET_POLL = 'GET_POLL';
export const VIEW_POLLS = 'VIEW_POLLS';
export const GET_POLL_ANALYTICS = 'GET_POLL_ANALYTICS';
export const TOGGLE_POLL = 'TOGGLE_POLL';
export const DELETE_POLL = 'DELETE_POLL';
export const UPDATE_POLL = 'UPDATE_POLL';
export const EDIT_POLL = 'EDIT_POLL';

/* 
action creators
*/

export const createPollAction = data => {
  return { type: CREATE_POLL, data }
}
export const getPollAction = data => {
  return { type: GET_POLL, data }
}
export const setPollAction = data => {
  return { type: VIEW_POLLS, data }
}
export const getAnalyticAction = data => {
  return { type: GET_POLL_ANALYTICS, data }
}
export const togglePollAction = index => {
  return { type: TOGGLE_POLL, index }
}
export const deletePollAction = data => {
  return { type: DELETE_POLL, data }
}
export const updatePollAction = data => {
  return { type: UPDATE_POLL, data }
}
export const editPollAction = data => {
  return { type: EDIT_POLL, data }
}

export const getPoll = (pollId) => {
  return async (dispatch) => {
    //API call
    let pollDetails = await getData(`/polls/${pollId}`);
    const pollData = pollDetails.data ? pollDetails.data : [];
    dispatch(getPollAction({ pollData }));
  }
}

export const getPollAnalytics = (data) => {
  return async (dispatch) => {
    let pollData = await postData('/polls/getTopPolls', data);
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
    console.log('deletedPoll_________', deletedPoll);
    dispatch(deletePollAction(deletedPoll.data));
  }
}

export const updatePoll = (poll) => {
  return (dispatch) => {
    dispatch(updatePollAction(poll));
  }
}

export const editPoll = (poll) => {
  return async (dispatch) => {
    let editPoll = await updateData(`/polls`,poll);
    console.log('deletedPoll_________', editPoll);
    dispatch(deletePollAction(editPoll));
  }
}