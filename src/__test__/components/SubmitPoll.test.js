import React from "react";
import { Provider } from "react-redux";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store"; // Smart components

// Component to be tested
import Index from "./../../components/submitpolls/Index";
configure({ adapter: new Adapter() });
// create any initial state needed
const initialState = {};
// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();
const store = mockStore();

describe("Index Component", () => {
  let wrapperIndex;
  // our mock Index function to replace the one provided by mapDispatchToProps
  const mockIndexfn = jest.fn();
  describe("render()", () => {
    test("renders the component", () => {
      const wrapper = shallow(
        <Provider store={store}>
          <Index />
        </Provider>
      );
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
