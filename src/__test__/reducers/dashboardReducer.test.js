import dashboardReducer from "../../reducers/dashboardReducers";
import {
  CREATE_POLL,
  GET_POLL,
  GET_POLL_ANALYTICS,
  EDIT_POLL,
  DELETE_POLL,
  DELETE_POLL_QUESTION,
  DELETE_POLL_OPTION,
} from "../../actions";
import {
  dashboard_initialState,
  dashboard_pollAnalytics,
  createPollDetails,
  getPollDetails,
  editPollDetails,
  deletePollMsg
} from "./mocks";

describe("Dashboard Reducer", () => {
  // Checking for initial state.
  it("should return the initial state", () => {
    expect(dashboardReducer(undefined, {})).toEqual(dashboard_initialState);
  });

  // check CREATE_POLL
  it("should return newly created poll data in  state", () => {
    const successAction = {
      type: CREATE_POLL,
      data: createPollDetails
    };
    expect(dashboardReducer(dashboard_initialState, successAction)).toEqual({
      ...dashboard_initialState,
      polls: successAction.data.pollData
    });
  });

  // check GET_POLL_ANALYTICS
  it("should return poll analytics data in  state", () => {
    const successAction = {
      type: GET_POLL_ANALYTICS,
      data: dashboard_pollAnalytics
    };
    expect(dashboardReducer(dashboard_initialState, successAction)).toEqual({
      ...dashboard_initialState,
      pollsAnalytics: successAction.data
    });
  });

  // check GET_POLL
  it("should return single poll data in  state", () => {
    const successAction = {
      type: GET_POLL,
      data: getPollDetails
    };
    expect(dashboardReducer(dashboard_initialState, successAction)).toEqual({
      ...dashboard_initialState,
      editPoll: successAction.data.pollData
    });
  });

  //check EDIT_POLL
  it("should return poll edit success details in  state", () => {
    const successAction = {
      type: EDIT_POLL,
      data: editPollDetails
    };
    expect(dashboardReducer(dashboard_initialState, successAction)).toEqual({
      ...dashboard_initialState,
      editDetails: successAction.data,
      editPoll: []
    });
  });

  //check DELETE_POLL
  it("should return deleted message with id for selected poll in  state", () => {
    const successAction = {
      type: DELETE_POLL,
      data: deletePollMsg
    };
    expect(dashboardReducer(dashboard_initialState, successAction)).toEqual({
      ...dashboard_initialState,
      deletedPollId: successAction.data
    });
  });

  //check DELETE_POLL_QUESTION
  it("should return deelted message with question id for selected question in  state", () => {
    const successAction = {
      type: DELETE_POLL_QUESTION,
      data: editPollDetails
    };
    expect(dashboardReducer(dashboard_initialState, successAction)).toEqual({
      ...dashboard_initialState,
      deleteQuestionDetails: successAction.data
    });
  });

  //check DELETE_POLL_OPTION
  it("should return deelted message with question id for selected question in  state", () => {
    const successAction = {
      type: DELETE_POLL_OPTION,
      data: editPollDetails
    };
    expect(dashboardReducer(dashboard_initialState, successAction)).toEqual({
      ...dashboard_initialState,
      deleteOptionDetails: successAction.data
    });
  });

});
