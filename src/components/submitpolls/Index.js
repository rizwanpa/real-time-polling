import React, { Component, createRef } from "react";
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Card,
  Radio,
  Checkbox
} from "antd";
import { getPollByUuid } from "./../../actions/submitPoll";
import "./Index.css";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  formRef = createRef();
  formUuidRef = createRef();
  formPollRef = createRef();
  componentDidMount() {
    console.log('index==> componentDidMount', this.props);
  }
  componentWillReceiveProps(nextProps) {
    console.log('index===>componentWillReceiveProps', nextProps.poll[0]);
    console.log('index===>componentWillReceiveProps CONDITIONS=======>', typeof nextProps.poll[0].uuid, `/submit-poll/${nextProps.poll[0].uuid}`);
    if (!this.props.match.params.uuid) {
      let uuid = nextProps.poll[0].uuid;
      this.props.history.push(`/submit-poll/${uuid}`)
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('index===>componentDidUpdate', prevProps, this.props)
  }
  onFinish = formData => {
    console.log('===============', formData.uuid);
    this.props.getPollByUuidAction(formData.uuid);
  };
  render() {
    console.log('index props----', this.props.poll[0]);
    return (
      <div className="survey-index">
        {(!this.props.match.params.uuid) ?
          <div className="survey-box">
            <Form
              labelCol={{ span: 14 }}
              wrapperCol={{ span: 14 }}
              layout="vertical"
              size="small"
              onFinish={this.onFinish}
              ref={this.formRef}
            >
              <Form.Item
                label="Poll Code"
                validateTrigger={["onChange", "onBlur"]}
                rules={[
                  {
                    required: true,
                    whitespace: false,
                    message: "Please enter poll code to continue."
                  }
                ]}
                name="uuid"
              >
                <Input
                  ref={this.formUuidRef}
                  autoComplete="off"
                  placeholder="Enter 6 digit poll code"
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Submit Poll
            </Button>
            </Form>
          </div>
          :
          <div className='survey-poll'>
            <Form
              labelCol={{ span: 14 }}
              wrapperCol={{ span: 14 }}
              layout="vertical"
              size="small"
              onFinish={this.onFinish}
              ref={this.formPollRef}
            >
            {this.props.poll && 
            this.props.poll.map((poll)=>{
              return (
              <Card key = {poll.id} title={poll.title}>
                {poll.questions && poll.questions.map((question)=>{
                  return (<Card
                    key={question.id}
                    style={{ marginTop: 16 }}
                    type="inner"
                    title={question.question}
                    >
                      <div >
                      <ul className="list-group">
                    {
                      question.options && question.options.map((option)=>{
                        let typeOption = question.type ? <Checkbox>{option.option}</Checkbox>: <Radio>{option.option}</Radio>
                      return (
                        <li key={option.option} className="list-group-item">{typeOption}</li>
                        
                        )
                      })
                    }
                    </ul>                      
                    </div>
                  </Card>)

                })}
              </Card>)

            })
                }
            </Form>  
          </div>
      }
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('~~~~~~~~~~~~~submit-polls state--------', state);
  return { poll: state.pollForVote.poll };
};

const mapDispatchToProps = {
  getPollByUuidAction: getPollByUuid
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
