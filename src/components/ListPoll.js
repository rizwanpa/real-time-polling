import React, { Component } from "react";
import { connect } from "react-redux";

class ListPoll extends Component{

  render() {
    return (
      <div>ListPoll</div>
    )
  }
}

const mapStateToProps = state => {
  console.log("ListPoll-->", state);
  return { ...state };
};

export default connect(
  mapStateToProps
)(ListPoll);
