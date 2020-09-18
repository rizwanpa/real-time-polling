import React, { Component } from "react";
import { connect } from "react-redux";
import "./css/Dashboard.css";
import "./css/List.css";
import { getPollAnalytics, deletePoll } from "./../actions";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {Button} from 'antd';


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
    return (
      <div className="dashboard list">
        <div className="polls">
          {this.props.pollsAnalytics.map((poll, index) => 
            <div key={index}>
              <div className="poll">
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
                <div className="poll-actions">
                  <Button  shape="circle" icon={<EditOutlined />} />
                  <Button  shape="circle" icon={<DeleteOutlined />} />
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
