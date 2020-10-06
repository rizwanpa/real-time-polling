import React, { Component } from "react";
import { connect } from "react-redux";
import "./css/Dashboard.css";
import "./css/List.css";
import { getPollAnalytics, deletePoll, togglePoll } from "./../actions";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Tag, Popconfirm } from 'antd';

class ListPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      params: {
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
    if (prevProps.deletedPollId !== this.props.deletedPollId) {
      this.props.getPollAnalyticsAction(this.state.params);
    }
  }

  goToSurvey(poll) {
    
  }
  delete(poll) {
    this.props.deletePollAction(poll.id);
  }
  toggleSurvey(index) {
    this.props.togglePollAction(index);
  }
  edit(poll) {
    //this.props.edt(poll.id);
    this.props.history.push(`/edit-poll/${poll.id}`);
  }

  render() {
    let currentDateTime = Math.floor(Date.now()/1000);
    return (
      <div className="dashboard list">
        <div className="polls">
          {this.props.pollsAnalytics.map((poll, index) =>{
            let pollStatus = poll.status;
            if(poll.end_date < currentDateTime){
              pollStatus = 'completed';
            }
            return (<div key={index}>
              <div className={`poll ${poll.status}`} onClick={() => this.toggleSurvey(index)}>
                <div className="poll-info">
                  <p> {poll.title}</p>
                  <p className="poll-desc">{poll.description}</p>
                </div>
                <div className="poll-status">
                  {<Tag color={pollStatus == 'published' ? 'green' : (pollStatus == 'draft' ? 'cyan' : 'red')}>{pollStatus}</Tag>}
                </div>
                <div className="poll-response">
                  <div className="questions">
                    <p className="text-center">{poll.questions.length}</p>
                    <p className="text-center">Questions</p>
                  </div>
                  <div className="responses">
                    <p className="text-center">Code</p>
                    <p className="text-center">{poll.uuid?poll.uuid:''}</p>  
                  </div>
                </div>
                <div className="poll-actions">
                  <Button onClick={()=>this.edit(poll)} shape="circle" icon={<EditOutlined />} disabled={poll.status == 'draft' ? false : true} />
                  <Popconfirm
                    title="Are you sure delete this poll?"
                    onConfirm={()=>this.delete(poll)}
                    //onCancel={()=>{console.log('NO')}}
                    okText="Yes"
                    cancelText="No"
                  >
                  <Button shape="circle" icon={<DeleteOutlined />} />
                  </Popconfirm>
                </div>

              </div>
              <div className="poll-details" style={poll.expanded ? { display: 'block' } : { display: 'none' }}>
                {poll.questions.map((question, index) =>
                  <div className="poll-question" key={index}>
                    <div className="question-text">{index + 1}. {question.question}</div>
                    <div className="response">
                      {question.options.map((option, index) =>
                        <Tag color='default' key={option.option}>{option.option}</Tag>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>)}
          )}
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
  togglePollAction: togglePoll,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPoll);
