import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>Dashboard</div>
    )
  }
}

const mapStateToProps = state => {
  console.log("Dashboard-->", state);
  return { ...state };
};

export default connect(
  mapStateToProps
)(Dashboard);
