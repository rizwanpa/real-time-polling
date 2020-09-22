import { defineState } from "redux-localstore";
import {
    GET_POLL_BY_UUID,
    SUBMIT_POLL_VOTE
} from "./../actions/submitPoll";

const defaultState = {
  poll: [],
  voteDetails : {}
};

const initialState = defineState(defaultState)("PollForVote");
export default (state = initialState, actions) => {
  console.log('REDUCERS===>',actions);
  switch (actions.type) {
    case GET_POLL_BY_UUID:
      return {
        ...state,
        poll : [...actions.data.pollData]
      };
    case SUBMIT_POLL_VOTE:
      return {
        ...state,
        voteDetails : {...actions.data.voteDetails},
        poll:[]
      };
    default:
      return {
        ...state
      };
  }
};
