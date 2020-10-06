import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import _ from "lodash";
import { getPoll, editPoll, deletePollOption, deletePollQuestion } from "./../actions";
import { BASE_URL } from "./../constants/appConfig";
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
      editPoll: [],
      modalVisible: false,
      modalTitle: ""
    };
    this.validation = 0;
  }
  componentDidMount() {
    if (this.props.match.params.pollId) {
      this.props.getPollAction(this.props.match.params.pollId);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      editPoll: nextProps.editPoll
    });
    if (
      !nextProps.editDetails.errorCode &&
      nextProps.editDetails.errorCode == 0 &&
      nextProps.editPoll.length == 0
    ) {
      message.success(nextProps.editDetails.data);
      if(this.state.editPoll.status == "published"){
        this.showModal();
      }else{
        this.props.history.push(`/polls`);
      }
    } else {
      //message.error('OPPs something went wrong!');
    }
  }
  //componentDidUpdate() {}
  onChangeHandledTitle = e => {
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
    let { title } = this.state.editPoll
    if (title == '') {
      return false;
    }
    if (this.validation) {
      return false;
    }
    let { status } = this.state.editPoll
    if (status !== "" && status === "published") {
      let { questions } = this.state.editPoll;
      if (_.isNil(questions) || Object.keys(questions).length == 0) {
        message.error("Atleast one question is required to publish poll");
        return false;
      }
      if (!_.isNil(questions) && Object.keys(questions).length) {
        for (let i = 0; i < Object.keys(questions).length; i++) {
          if (
            _.isNil(questions[i].options) ||
            Object.keys(questions[i].options).length == 0
          ) {
            message.error("Options are missing");
            return false;
          }
        }
      }
    }
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
  removeOption = (questionIndex, optionIndex) => {
    this.setState(prevState => {
      let editPoll = Object.assign({}, prevState.editPoll);
      let optionId = editPoll.questions[questionIndex].options[optionIndex].id;
      if (optionId) {
        this.props.deletePollOptionAction(optionId)
      }
      editPoll.questions[questionIndex].options.splice(optionIndex, 1)
      return { editPoll };
    });
  }
  removeQuestion = (questionIndex) => {
    this.setState(prevState => {
      let editPoll = Object.assign({}, prevState.editPoll);
      let questionId = editPoll.questions[questionIndex].id;
      if (questionId) {
        this.props.deletePollQuestionAction(questionId)
      }
      editPoll.questions.splice(questionIndex, 1)
      return { editPoll };
    });
  }
  unixToTimestamp = (unix) => {
    let a = new Date(unix * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let timestamp = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec;
    return timestamp;
  }
  handleDatePickerChange = (date, dateString, name) => {
    let updateDate = { [name]: date.unix() };
    this.setState(prevState => {
      let editPoll = Object.assign({}, prevState.editPoll); // creating copy of state variable editPoll
      editPoll = {
        ...editPoll,
        ...updateDate
      }; // update the name property, assign a new value
      return { editPoll }; // return new object jasper object
    })

  }
  showModal = () => {
    this.setState({
      modalVisible: true,
      modalTitle:  this.state.editPoll.title,
      uuid: this.state.editPoll.uuid
    });
  };
  handleOk = e => {
    this.setState({
      modalVisible: false,
      modalTitle: "",
      uuid: ""
    },()=>  this.props.history.push(`/polls`));
  };
  render() {
    let { editPoll } = this.state;
    this.validation = 0;
    /* let startDate = moment
      .unix(editPoll.start_date)
      .format("YYYY-MM-DD HH:mm:ss"); 
    let startDate = this.unixToTimestamp(editPoll.start_date);
    let endDate = this.unixToTimestamp(editPoll.end_date);
    */
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
          className={editPoll.title != '' ? `input-title` : `input-title field-error`}
          value={editPoll.title}
          onChange={this.onChangeHandledTitle}
          autoComplete="off"
        />
        <div style={{ color: 'red', height: '5px' }}>{editPoll.title == '' ? "Please input poll title." : ""}</div>
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
            this.validation = question.question == '' ? 1 : this.validation
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
                      autoComplete="off"
                      className={question.question !== '' ? `input-question input-title` : `input-question input-title field-error`}
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
                  <div style={{ color: 'red', height: '10px' }}>{question.question == '' ? "Please input question." : ""}</div>
                  {question.options &&
                    question.options.map((option, optIndex) => {
                      this.validation = option.option == '' ? 1 : this.validation;
                      return (
                        <div className="options" key={option.id}>
                          <div className="dispaly-flex">
                            <input
                              id={`option_${option.id}`}
                              name={`option_${option.id}`}
                              type="text"
                              autoComplete="off"
                              className={option.option !== '' ? `input-question input-title` : `input-question input-title field-error`}
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
                          <div style={{ color: 'red', height: '10px' }}>{option.option == '' ? "Please input option." : ""}</div>
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
              disabledDate={(current) => current && current < moment()}
              value={moment(moment
                .unix(editPoll.start_date)
                .format("YYYY-MM-DD HH:mm:ss"), "YYYY-MM-DD HH:mm:ss")}
              onChange={(date, dateString) => this.handleDatePickerChange(date, dateString, 'start_date')}
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
              disabledDate={(current) => current && current < moment()}
              value={moment(moment
                .unix(editPoll.end_date)
                .format("YYYY-MM-DD HH:mm:ss"), "YYYY-MM-DD HH:mm:ss")}
              onChange={(date, dateString) => this.handleDatePickerChange(date, dateString, 'end_date')}
            />
          </Col>
        </Row>
        <Radio.Group
          value={editPoll.status == "draft" ? "draft" : "published"}
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
        <Modal
          title={this.state.modalTitle}
          centered
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          cancelButtonProps={{ display: "none" }}
          width={300}
          footer={[
            <Button key="back" onClick={this.handleOk}>
              OK
            </Button>
          ]}
        >
          <div style={{ textAlign: "center" }}>
            <deckgo-qrcode
              content={`${BASE_URL}/submit-poll/${this.state.uuid}`}
            ></deckgo-qrcode>
            <div className="pollUrl">{`${BASE_URL}/submit-poll/${this.state.uuid}`}</div>
            <div className="padding10">{`Poll Code - ${this.state.uuid}`}</div>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
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
