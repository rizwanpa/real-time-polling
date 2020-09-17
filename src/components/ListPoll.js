import React, { Component } from "react";
import { connect } from "react-redux";
import "./css/List.css";
import { getPollAnalytics, deletePoll } from "./../actions";

class ListPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      params : {
        status: "",
        sort: "",
        order: "",
        limit: 100,
        fromDate: "",
        endDate: "",
        title: ""
      }
    };
  }

  componentDidMount() {
    let accessToken = sessionStorage.getItem("accessToken");
    if (accessToken === "" || accessToken === null) {
      this.props.history.push("/login");
    }
    let params = {
      status: "",
      sort: "",
      order: "",
      limit: 100,
      fromDate: "",
      endDate: "",
      title: ""
    };
    this.props.getPollAnalyticsAction(params);
  }
  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate",prevProps.deletedPollId, this.props.deletedPollId);
    if(prevProps.deletedPollId !== this.props.deletedPollId){
      this.props.getPollAnalyticsAction(this.state.params);
    }
  }

  goToSurvey(poll) {
    console.log(poll.uuid);
  }
  delete(poll) {
    console.log(poll.uuid);
    this.props.deletePollAction(poll.id);
  }
  edit(poll) {
    console.log(poll.uuid);
    //this.props.edt(poll.id);
    this.props.history.push(`/create-poll/${poll.id}`);
  }
  render() {
    console.log("list poll=>>>>", this.props.pollsAnalytics);
    return (
      <div className="list">
        <div className="polls">
          {this.props.pollsAnalytics.map((poll, index) => (
            <div className="list" key={index}>
              <div className="poll-title" onClick={() => this.goToSurvey(poll)}>
                <div className="poll-info">
                  <p>{poll.title}</p>
                  <p className="poll-desc">{poll.description}</p>
                </div>
                <div className="poll-response">
                  <div className="questions">
                    <p className="text-center">{poll.questions.length}</p>
                    <p>Questions</p>
                  </div>
                  <div className="responses">
                    <p className="text-center">{poll.totalResponses}</p>
                    <p onClick = {()=>this.delete(poll)}>delete</p>
                    <p onClick = {()=>this.edit(poll)}>edit</p>
                  </div>
                </div>
              </div>
              {poll.questions.map(question => {
                return (
                  <div key={question.id} className="question">
                    <div>{question.question}</div>
                    {question.options.map(option=>{
                      return(<div className="progress" key={option.id} >
                      {option.option}
                      </div>)
                    }
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pollsAnalytics: state.dashboard.pollsAnalytics,
    deletedPollId: state.dashboard.deletedPollId
  };
};

const mapDispatchToProps = {
  getPollAnalyticsAction: getPollAnalytics,
  deletePollAction: deletePoll,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPoll);
