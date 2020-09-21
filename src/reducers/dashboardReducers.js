import { defineState } from "redux-localstore";
import {
  CREATE_POLL,
  GET_POLL,
  VIEW_POLLS,
  GET_POLL_ANALYTICS,
  TOGGLE_POLL,
  DELETE_POLL,
  UPDATE_POLL
} from "./../actions/index";
import { act } from "react-dom/test-utils";

const defaultState = {
  polls: [],
  pollsAnalytics: [],
  deletedPollId: ""
};

const initialState = defineState(defaultState)("polls");
export default (state = initialState, actions) => {
  console.log("actions--->", actions);
  switch (actions.type) {
    case GET_POLL_ANALYTICS:
      return {
        ...state,
        pollsAnalytics: actions.data
      };
    case DELETE_POLL:
      return {
        ...state,
        deletedPollId: actions.data
      };
    case CREATE_POLL:
      return {
        ...state
      };
    case GET_POLL:
      return {
        ...state
      };
    case VIEW_POLLS:
      return {
        ...state
      };
    case TOGGLE_POLL:
      let pollsAnalytics = state.pollsAnalytics[actions.index];
      if (!("expanded" in pollsAnalytics)) {
        pollsAnalytics.expanded = false;
      }
      pollsAnalytics.expanded = !pollsAnalytics.expanded;
      return {
        ...state
      };
    case UPDATE_POLL:
      let pollId = Object.keys(actions.data)[0];      
      let pollIndex = state.pollsAnalytics.findIndex(poll => poll.id == pollId);
      //let pollsAnalytics = state.pollsAnalytics;
      state.pollsAnalytics[pollIndex].questions.forEach(question => {
        question.options.forEach(option => {
          if(actions.data[pollId][question.id]['options'][option.id]){
            option.percentage = actions.data[pollId][question.id]['options'][option.id].percentage;
          }
        })
      });
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
