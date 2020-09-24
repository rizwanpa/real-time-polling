import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { getPoll, editPoll, deletePollOption, deletePollQuestion } from "./../actions";
import {
  Divider,
  Form,
  Input,
  Button,
  Radio,
  Space,
  DatePicker,
  Row,
  Col,
  message,
  Modal
} from "antd";
import "./css/EditPoll.css";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

class EditPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editPoll: []
    };
  }
  componentDidMount() {
    console.log(
      "inside edit---componentDidMount",
      this.props,
      this.props.match.params.pollId
    );
    if (this.props.match.params.pollId) {
      this.props.getPollAction(this.props.match.params.pollId);
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("###############receiveProps==>", nextProps);
    this.setState({
      editPoll: nextProps.editPoll
    });
    if (
      !nextProps.editDetails.errorCode &&
      nextProps.editDetails.errorCode == 0 &&
      nextProps.editPoll.length == 0
    ) {
      message.success(nextProps.editDetails.data);
      this.props.history.push(`/polls`);
    } else {
      //message.error('OPPs something went wrong!');
    }
  }
  componentDidUpdate() {
    console.log("inside edit---componentDidUpdate", this.props, this.state);
    if (this.props.match.params.uuid) {
    }
  }
  onChangeHandledTitle = e => {
    console.log("change tilte==>", e.target.name, e.target.value, e.target);
    let updateval = { [e.target.name]: e.target.value };
    this.setState(prevState => {
      let editPoll = Object.assign({}, prevState.editPoll); // creating copy of state variable editPoll
      editPoll = {
        ...editPoll,
        ...updateval
      }; // update the name property, assign a new value
      return { editPoll }; // return new object jasper object
    });
  };
  onChangeHandledQuestion = (value, index, question_id) => {
    this.setState(prevState => {
      let editPoll = Object.assign({}, prevState.editPoll); // creating copy of state variable editPoll
      editPoll.questions[index].question = value;
      editPoll = {
        ...editPoll
      }; // update the name property, assign a new value
      return { editPoll }; // return new object jasper object
    });
  };
  onChangeHandledOption = (value, questionIndex, optionIndex) => {
    this.setState(prevState => {
      let editPoll = Object.assign({}, prevState.editPoll); // creating copy of state variable editPoll
      editPoll.questions[questionIndex].options[optionIndex].option = value;
      editPoll = {
        ...editPoll
      }; // update the name property, assign a new value
      return { editPoll }; // return new object jasper object
    });
  };
  onChangeType = (value, questionIndex) => {
    console.log("onChageType===>", value, questionIndex);
    this.setState(prevState => {
      let editPoll = Object.assign({}, prevState.editPoll);
      editPoll.questions[questionIndex].type = value;
      editPoll = {
        ...editPoll
      };
      return { editPoll };
    });
  };
  addQuestion = () => {
    this.setState(prevState => {
      let editPoll = Object.assign({}, prevState.editPoll);
      editPoll.questions.push({
        question: "",
        type: 0,
        options: []
      });
      editPoll = {
        ...editPoll
      };
      return { editPoll };
    });
  };
  addOption = questionIndex => {
    this.setState(prevState => {
      let editPoll = Object.assign({}, prevState.editPoll);
      if (!editPoll.questions[questionIndex].options) {
        editPoll.questions[questionIndex]["options"] = [];
      }
      editPoll.questions[questionIndex].options.push({
        option: ""
      });
      editPoll = {
        ...editPoll
      };
      return { editPoll };
    });
  };
  updatePoll = () => {
    this.props.editPollAction(this.state.editPoll);
  };
  onChangeStatus = value => {
    this.setState(prevState => {
      let editPoll = Object.assign({}, prevState.editPoll);
      editPoll.status = value;
      editPoll = {
        ...editPoll
      };
      return { editPoll };
    });
  };
  removeOption = (questionIndex, optionIndex) =>{
    this.setState(prevState => {
      let editPoll = Object.assign({}, prevState.editPoll);
      console.log('editPoll--->',editPoll.questions[questionIndex].options[optionIndex].id);
      let optionId = editPoll.questions[questionIndex].options[optionIndex].id;
      if(optionId){
        this.props.deletePollOptionAction(optionId)
      }
      editPoll.questions[questionIndex].options.splice(optionIndex, 1)
      return { editPoll };
    });
  }
  removeQuestion = (questionIndex) =>{
    this.setState(prevState => {
      let editPoll = Object.assign({}, prevState.editPoll);
      console.log('editPoll--->',editPoll.questions[questionIndex]);
      let questionId = editPoll.questions[questionIndex].id;
      if(questionId){
        this.props.deletePollQuestionAction(questionId)
      }
      editPoll.questions.splice(questionIndex, 1)
      return { editPoll };
    });
  }
  render() {
    console.log("edit render", this.state);
    let { editPoll } = this.state;
    let startDate = moment
      .unix(editPoll.start_date)
      .format("YYYY-MM-DD HH:mm:ss");
    console.log(
      "0000000000000000",
      moment.unix(editPoll.start_date).format("YYYY-MM-DD HH:mm:ss"),
      startDate
    );
    return (
      <div style={{ width: "60%" }}>
        {/* Title */}
        <label htmlFor="title" className="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="input-title"
          value={editPoll.title}
          onChange={this.onChangeHandledTitle}
        />

        {/* description */}
        <label htmlFor="description" className="desc-title">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          type="text"
          className="text-area-input input-title"
          value={editPoll.description}
          onChange={this.onChangeHandledTitle}
        />
        {editPoll.questions &&
          editPoll.questions.map((question, index) => {
            return (
              <>
                <div className="questions" key={question.id}>
                  <label htmlFor="title" className="title">{`Question ${index +
                    1}`}</label>
                  <div className="dispaly-flex">
                    <input
                      id={`question_${index}`}
                      name={`question_${question.id}`}
                      type="text"
                      className="input-question input-title"
                      value={question.question}
                      index={index}
                      question_id={question.id}
                      onChange={e =>
                        this.onChangeHandledQuestion(
                          e.target.value,
                          index,
                          question.id
                        )
                      }
                    />
                    <span style={{ padding: "0.5em" }}>
                      <MinusCircleOutlined
                        style={{
                          padding: "10px 5px"
                        }}
                        onClick={() => this.removeQuestion(index)}
                      />
                    </span>
                  </div>
                  {question.options &&
                    question.options.map((option, optIndex) => {
                      return (
                        <div className="options" key={option.id}>
                          <div className="dispaly-flex">
                            <input
                              id={`option_${option.id}`}
                              name={`option_${option.id}`}
                              type="text"
                              className="input-question input-title"
                              value={option.option}
                              onChange={e =>
                                this.onChangeHandledOption(
                                  e.target.value,
                                  index,
                                  optIndex
                                )
                              }
                            />
                            <span style={{ padding: "0.5em" }}>
                              <MinusCircleOutlined
                                style={{
                                  padding: "10px 5px"
                                }}
                                onClick={() => this.removeOption(index, optIndex)}
                              />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="options">
                  <Button
                    type="dashed"
                    size="small"
                    onClick={() => this.addOption(index)}
                  >
                    <PlusOutlined />
                    Add Option
                  </Button>
                </div>
                <div className="margin10">
                  <label htmlFor="description" className="desc-title">
                    Type
                  </label>
                  <Radio.Group
                    defaultValue={question.type ? 1 : 0}
                    size="small"
                    buttonStyle="solid"
                    onChange={e => this.onChangeType(e.target.value, index)}
                  >
                    <Radio.Button value={0}>Sinle</Radio.Button>
                    <Radio.Button value={1}>Multiple</Radio.Button>
                  </Radio.Group>
                </div>
              </>
            );
          })}
        <div className="questions">
          <Button type="dashed" size="small" onClick={() => this.addQuestion()}>
            <PlusOutlined />
            Add Question
          </Button>
        </div>
        <Row>
          <Col span={8}>
            <label htmlFor="description" className="desc-title">
              From
            </label>
            <DatePicker
              style={{
                width: "90%",
                padding: "5px 10px",
                margin: "8px 0",
                boxSizing: "border-box"
              }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              //defaultValue={moment(startDate, 'YYYY-MM-DD HH:mm:ss')}
            />
          </Col>
          <Col span={8}>
            <label htmlFor="description" className="desc-title">
              To
            </label>
            <DatePicker
              style={{
                width: "90%",
                padding: "5px 10px",
                margin: "8px 0",
                boxSizing: "border-box"
              }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              //defaultValue={moment('2015-01-01', 'YYYY-MM-DD')}
            />
          </Col>
        </Row>
        <Radio.Group
          defaultValue={editPoll.status == "draft" ? "draft" : "published"}
          size="small"
          buttonStyle="solid"
          onChange={e => this.onChangeStatus(e.target.value)}
        >
          <Radio value="draft">Save as draft</Radio>
          <Radio value="published">Publish</Radio>
        </Radio.Group>
        <div className="btn-update">
          <Button type="primary" onClick={this.updatePoll}>
            update Poll
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("~~~~~~~~~~~~~edit-polls state--------", state);
  return {
    editPoll: state.dashboard.editPoll,
    editDetails: state.dashboard.editDetails
  };
};

const mapDispatchToProps = {
  getPollAction: getPoll,
  editPollAction: editPoll,
  deletePollOptionAction: deletePollOption,
  deletePollQuestionAction: deletePollQuestion
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPoll);
