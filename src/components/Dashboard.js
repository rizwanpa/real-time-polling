import React, { Component } from "react";
import { connect } from "react-redux";
import "./css/Dashboard.css";
import { getPollAnalytics, togglePoll, updatePoll } from "./../actions";
import {HorizontalBar} from 'react-chartjs-2';
import {SOCKET_PATH, BASE_URL,SOCKET_URL} from '../constants/appConfig'
import io from 'socket.io-client'
var socket = io(SOCKET_URL, {path: SOCKET_PATH});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: []
    };
  }
  
  componentDidMount() {
    let accessToken = sessionStorage.getItem("accessToken");
   /*  if (accessToken === "" || accessToken === null) {
      this.props.history.push("/login");
    } else { */
      let currentDateTime = Math.floor(Date.now()/1000);
      let params = {
        status: "published",
        sort: "",
        order: "",
        limit: 5,
        fromDate: currentDateTime,
        endDate: currentDateTime,
        title: ""
      };
      this.props.getPollAnalyticsAction(params);
      console.log('sockrt io URL ---->',BASE_URL)
      socket.on('refresh-poll-list', (msg) => {
        console.log('refresh-poll-list-->',msg);
        this.props.updatePollAction(msg);
      });
    }

  toggleSurvey(index) {
    this.props.togglePollAction(index);
  }

  

  getChartData(question) {

    const data = {
      labels: [],
      datasets: []
    };
    question.options.forEach((option, index) => {
      // let randomColor = this.getRandomColor()
      data.labels.push(option.option)
      data.datasets.push({
        label: [option.option],
        backgroundColor: option.color,
        hoverBackgroundColor: option.color,
        hoverBorderColor: option.color,
        data: [option.percentage]
      })
    })
    return data;
  }

  render() {
    let chartOptions = {
      scales: {
        xAxes: [{
          stacked: true,
          display: true
        }],
        yAxes:[{
          stacked: true,
          display: false
        }]
      },
      legend: {
        display:true
      },
      tooltips:{
        enabled: true
      }
    }

    return (
      <div className="dashboard">
        <div className="polls">
          {this.props.pollsAnalytics.length !== 0 && this.props.pollsAnalytics.map((poll, index) => 
            <div key={index}>
              <div className="poll"  onClick={() => this.toggleSurvey(index)}>
                <div className="poll-info">
                  <p>{poll.title}</p>
                  <p className="poll-desc">{poll.description}</p>
                </div>
                <div className="poll-response">
                  <div className="questions">
                    <p className="text-center">{poll.questions.length}</p>  
                    <p className="text-center">Questions</p>
                  </div>
                  <div className="responses">
                    <p className="text-center">Code</p>
                    <p className="text-center">{poll.uuid}</p>  
                  </div>
                </div>
              </div>
              <div className="poll-details" style={poll.expanded?{display:'block'}:{display:'none'}}>
                {poll.questions.map((question, index) => 
                  <div className="poll-question" key={index}>
                    <div className="question-text">{index+1}. {question.question}</div>
                    <div className="response">
                      <HorizontalBar data={() => this.getChartData(question)} options={chartOptions} height={100}/>
                    </div>
                  </div>
                )}
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
  getPollAnalyticsAction: getPollAnalytics,
  togglePollAction: togglePoll,
  updatePollAction: updatePoll
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
