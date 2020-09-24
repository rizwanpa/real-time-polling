import React from "react";
import { Provider } from "react-redux";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store"; // Smart components

// Component to be tested
import Dashboard from "./../../components/Dashboard";
configure({ adapter: new Adapter() });
// create any initial state needed
const initialState = {
  polls: [],
  pollsAnalytics: [],
  deletedPollId: "",
  editPoll: [],
  editDetails: {}
};
// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();
const store = mockStore(initialState);

describe("Dashboard Component", () => {
  let wrapperDashboard;
  // our mock Dashboard function to replace the one provided by mapDispatchToProps
  const mockDashboardfn = jest.fn();
  describe("render()", () => {
    test("renders the component", () => {
      const wrapper = shallow(
        <Provider store={store}>
          <Dashboard />
        </Provider>
      );
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
