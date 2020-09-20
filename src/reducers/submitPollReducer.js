import { defineState } from "redux-localstore";
import {
    GET_POLL_BY_UUID
} from "./../actions/submitPoll";
import { act } from "@testing-library/react";

const defaultState = {
  poll: []
};

const initialState = defineState(defaultState)("PollForVote");
export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_POLL_BY_UUID:
      return {
        ...state,
        poll : [...actions.data.pollData]
      };
    default:
      return {
        ...state
      };
  }
};
