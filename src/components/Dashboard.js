import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import './css/Dashboard.css'

class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      polls:[]
    }
  }

  componentDidMount() {
    this.getPollData();
  }

  getPollData () {
    let request = {

    }
    axios.get('/', request).then((response) => {
      this.setState({
        polls: response.data.polls
      })
    })
  }

  goToSurvey(poll)  {
    console.log(poll.uuid);
  }

  render() {
    return (
      <div className="dashboard">
        <div className="polls">
          {this.state.polls.map((poll, index) => 
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
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(
  mapStateToProps
)(Dashboard);
