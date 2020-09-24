import { defineState } from "redux-localstore";
import {
  SET_SESSION,
  SET_SESSION_EXPIRED,
  RESET_SECURITY,
  PROLONG_SESSION
} from "./../actions/userAction";

const defaultState = {
  username: null,
  id: '',
  errors: {}
};

const initialState = defineState(defaultState)("userDetails");
export default (state = initialState, actions) => {
  console.log('userReducers==>',actions);
  switch (actions.type) {
    case SET_SESSION:
      return {
        ...state,
        id: actions.data.id,
        username: actions.data.name,
        errors: {}
      };
    case SET_SESSION_EXPIRED:
      return {
        ...state
      };
    case PROLONG_SESSION:
      return {
        ...state
      };
    case RESET_SECURITY:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
