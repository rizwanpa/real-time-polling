import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Card, Radio, Checkbox, InputNumber, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { getPollByUuid, submitPollVote } from "./../../actions/submitPoll";
import "./Index.css";


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyCode: "",
      pollError: false
    };
  }
  formRef = createRef();
  formUuidRef = createRef();
  formPollRef = createRef();
  codeInputRef = createRef();
  componentDidMount() {
    if (this.props.match.params.uuid) {
      this.setState(
        {
          surveyCode: this.props.match.params.uuid
        },
        () => this.props.getPollByUuidAction(this.props.match.params.uuid)
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps====>',nextProps,nextProps.voteDetails.errorCode !== undefined , nextProps.voteDetails.errorCode == 0);
    if (!this.props.match.params.uuid) {
      if (nextProps.poll.length) {
        let uuid = nextProps.poll[0].uuid;
        this.props.history.push(`/submit-poll/${uuid}`);
      } else {
        this.setState({
          pollError: true
        });
      }

    }
    if(this.props.match.params.uuid){
      if(nextProps.voteDetails.errorCode !== undefined && nextProps.voteDetails.errorCode == 0){
        this.props.history.push(`/thanks`);
      }
      if(nextProps.voteDetails.errorCode !== undefined && nextProps.voteDetails.errorCode == 1){
        message.error('OOPs something went wrong!');
      }
    }
      
  }
  componentDidUpdate(prevProps, prevState) {}
  getPoll = () => {
    if (this.state.surveyCode !== "")
      this.props.getPollByUuidAction(this.state.surveyCode);
  };

  pollVote = formData => {
    /* {
    "uuid":"GaQkVp",
    "questions":[
        {
            "id":61,
            "options":[144]
        },
        {
            "id":62,
            "options":[150,151]
        }
    ]
} */
    let voteObj = {
      uuid: this.state.surveyCode,
      questions: []
    };
    //Fromating data as per API and submiting poll.
    formData = JSON.parse(JSON.stringify(formData));
    Object.keys(formData).forEach(questionId => {
      let options =
        typeof formData[questionId] === "object"
          ? formData[questionId]
          : [formData[questionId]];
      voteObj.questions.push({
        id: questionId,
        options: options
      });
    });
    this.props.submitPollVoteAction(voteObj);
  };
  onChangeMobile = (mobile) => {
    console.log('MOBILE==>>>',mobile);
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(mobile) && reg.test(mobile)) || mobile === '') {
      this.setState({mobile:mobile});
    }
  }
  render() {
    return (
      <>
        {this.props.match.params.uuid && this.props.poll.length == 0 && (
          <div className="survey-index">
            <div className="survey-err" style={{ width: "400px" }}>
              Poll not found
            </div>
          </div>
        )}
        {!this.props.match.params.uuid ? (
          <div className="survey-index">
            <div className="survey-box">
              <div className="survey-header">Survey Code</div>
              {this.props.poll.length == 0 && this.state.pollError && (
                <div className="survey-err">Poll not found</div>
              )}
              <div className="survey-code">
                <input
                  className="code-input"
                  placeholder="code"
                  onChange={e =>
                    this.setState({
                      surveyCode: e.target.value,
                      pollError: false
                    })
                  }
                />
              </div>
              <div className="submit-code">
                <Button
                  type="primary"
                  shape="round"
                  size={200}
                  disabled={!this.state.surveyCode.length}
                  onClick={this.getPoll}
                >
                  START
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="survey-card">
            <div className="survey-poll">
              <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                size="small"
                onFinish={this.pollVote}
                ref={this.formPollRef}
              >
                {this.props.poll &&
                  this.props.poll.map(poll => {
                    return (
                      <>
                        {/* <div style={{ display: "flex" }}>
                          <Form.Item
                            label="Name"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: false,
                                message: "Please input name."
                              }
                            ]}
                            name="name"
                            style={{
                              height: "110px",
                              width: "400px"
                            }}
                          >
                            <Input
                              style={{
                                width: "100%",
                                padding: "12px 20px",
                                //margin: "8px 0",
                                boxSizing: "border-box"
                              }}
                              placeholder="Name"
                              autoComplete="off"
                            />
                          </Form.Item>
                          <Form.Item
                            label="Mobile"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: false,
                                message: "Please input mobile."
                              }
                            ]}
                            name="mobile"
                            style={{
                              height: "110px",
                              width: "400px"
                            }}
                          >
                            <Input
                              value = {this.state.mobile}
                              style={{
                                width: "100%",
                                padding: "12px 20px",
                                //margin: "8px 0",
                                boxSizing: "border-box"
                              }}
                              placeholder="Mobile"
                              autoComplete="off"
                              onChange={(e)=>this.onChangeMobile(e.target.value)}
                              placeholder="Input a number"
                              maxLength={10}
                            />
                          </Form.Item>
                        </div> */}
                        <Card key={poll.id} title={poll.title}>
                          {poll.questions &&
                            poll.questions.map(question => {
                              return (
                                <Card
                                  key={question.id}
                                  style={{ marginTop: 16 }}
                                  type="inner"
                                  title={question.question}
                                >
                                  <div>
                                    <ul className="list-group">
                                      <Form.Item
                                        name={question.id}
                                        className="collection-create-form_last-form-item"
                                        /* rules={[
                                      {
                                        type: "object",
                                        required: true,
                                        message: "Please select option!"
                                      }
                                    ]} */
                                      >
                                        {question.type ? (
                                          <Checkbox.Group className="width-100-per">
                                            {question.options &&
                                              question.options.map(option => {
                                                return (
                                                  <li
                                                    key={option.option}
                                                    className="list-group-item"
                                                  >
                                                    <Checkbox value={option.id}>
                                                      {option.option}
                                                    </Checkbox>
                                                  </li>
                                                );
                                              })}
                                          </Checkbox.Group>
                                        ) : (
                                          <Radio.Group className="width-100-per">
                                            {question.options &&
                                              question.options.map(option => {
                                                return (
                                                  <li
                                                    key={option.option}
                                                    className="list-group-item"
                                                  >
                                                    <Radio value={option.id}>
                                                      {option.option}
                                                    </Radio>
                                                  </li>
                                                );
                                              })}
                                          </Radio.Group>
                                        )}
                                      </Form.Item>
                                    </ul>
                                  </div>
                                </Card>
                              );
                            })}
                        </Card>
                      </>
                    );
                  })}
                {this.props.poll.length !== 0 && (
                  <div className="submit-code">
                    <Button
                      type="primary"
                      shape="round"
                      size={200}
                      htmlType="submit"
                    >
                      VOTE
                    </Button>
                  </div>
                )}
              </Form>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log("~~~~~~~~~~~~~submit-polls state--------", state);
  return {
    poll: state.pollForVote.poll,
    voteDetails: state.pollForVote.voteDetails
  };
};

const mapDispatchToProps = {
  getPollByUuidAction: getPollByUuid,
  submitPollVoteAction: submitPollVote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
