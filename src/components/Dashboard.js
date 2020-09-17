import React, { Component } from "react";
import { connect } from "react-redux";
import "./css/Dashboard.css";
import { getPollAnalytics } from "./../actions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: []
    };
  }

  componentDidMount() {
    let accessToken = sessionStorage.getItem("accessToken");
    if (accessToken === "") {
        this.props.history.push("/login");
    }
    let params = {
      status: "published",
      sort: "",
      order: "",
      limit: 5,
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
    return (
      <div className="dashboard">
        <div className="polls">
          {this.props.pollsAnalytics.map((poll, index) => 
            <div className="poll" key={index} onClick={ () => this.goToSurvey(poll)}>
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
          ) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { pollsAnalytics : state.dashboard.pollsAnalytics };
};

const mapDispatchToProps =  {
  getPollAnalyticsAction: getPollAnalytics
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
