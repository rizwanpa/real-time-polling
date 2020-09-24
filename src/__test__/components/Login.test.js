import React from "react";
import { Provider } from "react-redux";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store"; // Smart components

// Component to be tested
import Login from "./../../components/Login";
configure({ adapter: new Adapter() });
// create any initial state needed
const initialState = {
  username: null,
  id: "",
  errors: {}
};
// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();
const store = mockStore({
  username: null,
  id: "",
  errors: {}
});

describe("Login Component", () => {
  let wrapperLogin;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockLoginfn = jest.fn();
  describe("render()", () => {
    test("renders the component", () => {
      const wrapper = shallow(
        <Provider store={store}>
          <Login />
        </Provider>
      );
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
