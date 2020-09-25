import submitPollReducer from "../../reducers/submitPollReducer";
import {
    GET_POLL_BY_UUID,
    SUBMIT_POLL_VOTE,
    getPollByUuidAction,
    submitPollVoteAction
  } from "../../actions/submitPoll";
import {initialSubmitState, getSubmitPoll, submitPollData} from './mocks'

describe("User Reducer", () => {
  // Checking for initial state.
  it("should return the initial state", () => {
    expect(submitPollReducer(undefined, {})).toEqual(initialSubmitState);
  });
  // checking GET_POLL_BY_UUID.
  it("should handle GET_POLL_BY_UUID", () => {
    const successAction = {
      type: GET_POLL_BY_UUID,
      data: getSubmitPoll
    };
    expect(submitPollReducer(initialSubmitState, successAction)).toEqual({
      ...initialSubmitState,
      poll : [...successAction.data.pollData]
     });
  });
  // checking SUBMIT_POLL_VOTE.
 it("should handle SUBMIT_POLL_VOTE", () => {
    const successAction = {
      type: SUBMIT_POLL_VOTE,
      data: submitPollData
    };
    expect(submitPollReducer(initialSubmitState, successAction)).toEqual({...initialSubmitState,
        voteDetails : {...successAction.data.voteDetails},
        poll:[]
    });
  });
});