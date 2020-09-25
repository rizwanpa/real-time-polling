import {
  CREATE_POLL,
  GET_POLL,
  GET_POLL_ANALYTICS,
  DELETE_POLL,
  EDIT_POLL,
  DELETE_POLL_OPTION,
  DELETE_POLL_QUESTION,
  createPollAction,
  getPollAction,
  getAnalyticAction,
  deletePollAction,
  editPollAction,
  deletePollOptionAction,
  deletePollQuestionAction
} from "../../actions";
import {
  createPollData,
  getPollData,
  getPollAnalyticData,
  deletePoll,
  editPollSuccess,
  deleteOPtion,
  deleteQuestion
} from "./mocks";

describe("Dashboard Action", () => {
  it("should return createPoll action with type and payload CREATE_POLL", () => {
    const data = createPollData;
    const expectedAction = {
      type: CREATE_POLL,
      data
    };
    expect(createPollAction(data)).toEqual(expectedAction);
  });
  it("should return getPoll action with type and payload GET_POLL", () => {
    const data = getPollData;
    const expectedAction = {
      type: GET_POLL,
      data
    };
    expect(getPollAction(data)).toEqual(expectedAction);
  });
  it("should return get-Poll-Analytics action with type and payload GET_POLL_ANALYTICS", () => {
    const data = getPollAnalyticData;
    const expectedAction = {
      type: GET_POLL_ANALYTICS,
      data
    };
    expect(getAnalyticAction(data)).toEqual(expectedAction);
  });
  it("should return delete-Poll action with type and payload DELETE_POLL", () => {
    const data = deletePoll;
    const expectedAction = {
      type: DELETE_POLL,
      data
    };
    expect(deletePollAction(data)).toEqual(expectedAction);
  });
  it("should return edit-Poll action with type and payload EDIT_POLL", () => {
    const data = editPollSuccess;
    const expectedAction = {
      type: EDIT_POLL,
      data
    };
    expect(editPollAction(data)).toEqual(expectedAction);
  });
  it("should return delete-Poll option action with type and payload DELETE_POLL_OPTION", () => {
    const data = deleteOPtion;
    const expectedAction = {
      type: DELETE_POLL_OPTION,
      data
    };
    expect(deletePollOptionAction(data)).toEqual(expectedAction);
  });
  it("should return delete-Poll option action with type and payload DELETE_POLL_QUESTION", () => {
    const data = deleteQuestion;
    const expectedAction = {
      type: DELETE_POLL_QUESTION,
      data
    };
    expect(deletePollQuestionAction(data)).toEqual(expectedAction);
  });
});
