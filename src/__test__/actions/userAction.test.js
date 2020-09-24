import { SET_SESSION, setSecurityAction } from "../../actions/userAction";
import { jwtUserToken } from './mocks';

describe("User Action", () => {
  it("should fetch the access-token", () => {
    const data = jwtUserToken;
    const expectedAction = {
      type: SET_SESSION,
      data
    };
    expect(setSecurityAction(data)).toEqual(expectedAction);
  });
});
