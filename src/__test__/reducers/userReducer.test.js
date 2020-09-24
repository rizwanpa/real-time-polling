import userReducers from "../../reducers/userReducers";
import {SET_SESSION, SET_SESSION_EXPIRED} from '../../actions/userAction';
import {initialState, userDetails} from './mocks'

describe("User Reducer", () => {
  // Checking for initial state.
  it("should return the initial state", () => {
    expect(userReducers(undefined, {})).toEqual(initialState);
  });
  // checking login action.
  it("should handle SET_SESSION", () => {
    const successAction = {
      type: SET_SESSION,
      data: userDetails
    };
    expect(userReducers({}, successAction)).toEqual({
      ...initialState,
      id:2,
      username:"Admin",
      errors: {}
     });
  });
  // checking logout action.
 it("should handle SET_SESSION_EXPIRED", () => {
    const successAction = {
      type: SET_SESSION_EXPIRED,
      data: {}
    };
    expect(userReducers(initialState, successAction)).toEqual({...initialState});
  });
});