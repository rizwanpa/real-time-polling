import { defineState } from "redux-localstore";
import {
  SET_SESSION,
  SET_SESSION_EXPIRED,
  RESET_SECURITY,
  PROLONG_SESSION
} from "./../actions/userAction";

const defaultState = {
  username: null,
  jwt: "",
  roles: [],
  errors: {}
};

const initialState = defineState(defaultState)("userDetails");
export default (state = initialState, actions) => {
  switch (actions.type) {
    case SET_SESSION:
      return {
        ...state,
        username: actions.data.name,
        jwt: actions.data.jwt,
        email: actions.data.email,
        roles: actions.data.role,
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
