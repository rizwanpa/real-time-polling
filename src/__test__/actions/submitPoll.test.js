import {
  GET_POLL_BY_UUID,
  SUBMIT_POLL_VOTE,
  getPollByUuidAction,
  submitPollVoteAction
} from "../../actions/submitPoll";
import { getSubmitPoll, submitPollData } from "./mocks";

describe("User Action", () => {
  it("should fetch the access-token", () => {
    const data = getSubmitPoll;
    const expectedAction = {
      type: GET_POLL_BY_UUID,
      data
    };
    expect(getPollByUuidAction(data)).toEqual(expectedAction);
  });

  it("should fetch the access-token", () => {
    const data = submitPollData;
    const expectedAction = {
      type: SUBMIT_POLL_VOTE,
      data
    };
    expect(submitPollVoteAction(data)).toEqual(expectedAction);
  });
});
