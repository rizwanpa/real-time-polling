import React from "react";
import { Provider } from "react-redux";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store"; // Smart components

// Component to be tested
import EditPoll from "./../../components/EditPoll";
configure({ adapter: new Adapter() });
// create any initial state needed
const initialState = {
  polls: [],
  pollsAnalytics: [],
  deletedPollId: "",
  editPoll : [],
  editDetails : {}
};
// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();
const store = mockStore(initialState);

describe("EditPoll Component", () => {
  let wrapperEditPoll;
  // our mock EditPoll function to replace the one provided by mapDispatchToProps
  const mockEditPollfn = jest.fn();
  describe("render()", () => {
    test("renders the component", () => {
      const wrapper = shallow(
        <Provider store={store}>
          <EditPoll />
        </Provider>
      );
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
