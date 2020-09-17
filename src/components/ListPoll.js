import React, { Component } from "react";
import { connect } from "react-redux";
import "./css/List.css";
import { getPollAnalytics } from "./../actions";

class ListPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: []
    };
  }

  componentDidMount() {
    let accessToken = sessionStorage.getItem("accessToken");
    if (accessToken === "" || accessToken === null) {
      this.props.history.push("/login");
    }
    let params = {
      status: "published",
      sort: "",
      order: "",
      limit: 100,
      fromDate: "",
      endDate: "",
      title: ""
    };
    this.props.getPollAnalyticsAction(params);
  }

  goToSurvey(poll) {
    console.log(poll.uuid);
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
                    <p>Responses</p>
                  </div>
                </div>
              </div>
              {poll.questions.map(question => {
                console.log(question);
                return (
                  <div key={question.id} className="question">
                    <div>{question.question}</div>
                    {question.options.map(option=>{
                      console.log('option===>',option.option);
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
  return { pollsAnalytics: state.dashboard.pollsAnalytics };
};

const mapDispatchToProps = {
  getPollAnalyticsAction: getPollAnalytics
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPoll);
