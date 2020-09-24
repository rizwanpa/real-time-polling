import dashboardReducer from "../../reducers/dashboardReducers";
import {GET_POLL_ANALYTICS, TOGGLE_POLL} from '../../actions/';
import { dashboard_initialState, dashboard_pollAnalytics, togglePollAnalytics } from './mocks';

describe("Dashboard Reducer", () => {
  // Checking for initial state.
  it("should return the initial state", () => {
    expect(dashboardReducer(undefined, {})).toEqual(dashboard_initialState);
  });

  // check GET_POLL_ANALYTICS
  it("should return poll analytics data in  state", () => {
    const successAction = {
        type: GET_POLL_ANALYTICS,
        data: dashboard_pollAnalytics
      };
      expect(dashboardReducer(dashboard_initialState, successAction)).toEqual({...dashboard_initialState,
        pollsAnalytics:successAction.data});
  });
  /* it("should return poll analytics data in  state", () => {
    const actions = {
        type: TOGGLE_POLL,
        index: 0
      };
      let dashboard_pollAnalyticsCopy = dashboard_pollAnalytics;
      let pollsAnalytics = dashboard_pollAnalyticsCopy[actions.index];
      if (!("expanded" in pollsAnalytics)) {
        pollsAnalytics.expanded = false;
      }
      expect(dashboardReducer({...dashboard_initialState,pollsAnalytics:dashboard_pollAnalytics}, actions)).toEqual({...dashboard_initialState,
        ...pollsAnalytics});
  }); */
});