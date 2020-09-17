import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import _ from 'lodash';
import "./css/CreatePoll.css";
import {
  Divider,
  Form,
  Input,
  Button,
  Radio,
  Space,
  DatePicker,
  Row,
  message,
  Modal
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import OptionForm from "./OptionForm";
import axios from "axios";
import moment from "moment";
import {BASE_URL} from './../constants/appConfig';
import fbIcon from './../icons/fbIcon.png';
import instagramIcon from './../icons/instagramIcon.png';
import twitterIcon from './../icons/twitterIcon.png'
const { TextArea } = Input;

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalTitle: ''
    };
  }
  componentDidMount(){
    let accessToken = sessionStorage.getItem("accessToken");
    if (accessToken === "") {
        this.props.history.push("/login");
    }
  }

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 }
    }
  };
  formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 0 }
    }
  };

  formTitleRef = createRef();

  savePoll(pollData) {
    console.log('SavePolls--->',pollData);
    let start_date = pollData.start_date.unix();
    let end_date = pollData.end_date.unix();
    let status = pollData.status;
    if(status !== '' && status === 'published'){
      console.log('inside published');
      let {questions} = pollData;
      if(_.isNil(questions) || Object.keys(questions).length == 0){
        console.log('Questons error');
        message.error('Atleast one question is required to publish poll');
        return false;
      }
      if(!_.isNil(questions) && Object.keys(questions).length){
        for(let i = 0; i < Object.keys(questions).length; i++){
          if(_.isNil(questions[i].options) || Object.keys(questions[i].options).length == 0){
            message.error('Options are missing');
            return false;
          }
        }
      }
    }
    //return false;
    axios.defaults.headers.common["Authorization"] =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNjAwMzE2NDg0LCJleHAiOjE2MDA0MDI4ODR9.EczrkagmfcoeqmBLLBQL9A7I8_mE59hsBtHjSGdMCa0";
    axios
      .post(`http://localhost:3030/polls/`, {
        ...pollData,
        start_date,
        end_date
      })
      .then(res => {
        console.log(res);
        let modalData = {
          title : res.data.poll.title,
          uuid : res.data.poll.uuid,

        }
        this.showModal(modalData);
      });
  }
  showModal = (modalData) => {
    this.setState({
      modalVisible: true,
      modalTitle : modalData.title || '',
      uuid : modalData.uuid,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      modalVisible: false,
      modalTitle:''
    });
  };

  render() {
    let questionArr = [1, 2];
    const onFinish = pollData => {
      this.savePoll(pollData);
    };
    return (
      <div className="create-poll-wrapper">
        <h1 className="">Create Poll</h1>
        <Divider />
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          size="small"
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            validateTrigger={["onChange", "onBlur"]}
            rules={[
              {
                required: true,
                whitespace: false,
                message: "Please input poll title."
              }
            ]}
            name="title"
          >
            <Input
              style={{
                width: "100%",
                padding: "12px 20px",
                //margin: "8px 0",
                boxSizing: "border-box"
              }}
              ref={this.formTitleRef}
              placeholder="Poll description"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            validateTrigger={["onChange", "onBlur"]}
            rules={[
              {
                required: false,
                whitespace: false,
                message: "Please input poll descripton."
              }
            ]}
            name="description"
          >
            <TextArea
              style={{
                width: "100%",
                padding: "12px 20px",
                //margin: "8px 0",
                boxSizing: "border-box"
              }}
              ref={this.formTitleRef}
              placeholder="Poll descripetion"
            />
          </Form.Item>
          {/* This is the Dynamic questions Adder */}
          <Form.List name="questions">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, index) => (
                    <Space
                      key={field.key}
                      style={{ display: "block", marginBottom: 8 }}
                      align="start"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, "question"]}
                        fieldKey={[field.fieldKey, "question"]}
                        rules={[
                          { required: true, message: "Missing question!" }
                        ]}
                      >
                        <span style={{ display: "flex" }}>
                          <Input
                            style={{
                              width: "100%",
                              padding: "5px 10px",
                              //margin: "8px 0",
                              boxSizing: "border-box"
                            }}
                            placeholder={"Question "+ (index+1)}
                          />
                          <MinusCircleOutlined
                            style={{
                              padding: "10px 5px"
                            }}
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </span>
                      </Form.Item>

                      {/* This is the Dynamic options Adder */}

                      <Form.Item style={{marginLeft: "2em"}}>
                        <OptionForm fieldKey={field.key} />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        name={[field.name, "type"]}
                        fieldKey={[field.fieldKey, "type"]}
                        label="Type"
                        initialValue={0}
                        style={{marginLeft: "2em"}}
                      >
                        <Radio.Group style={{
                          width: "100%",
                          padding: "5px 10px",
                          margin: "8px 0",
                          boxSizing: "border-box"
                        }}>
                          <Radio.Button value={0}>Single</Radio.Button>
                          <Radio.Button value={1}>Multiple</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> Add question
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
          <Row>
            <Form.Item
              style={{
                height: "150px",
                width: "400px"
              }}
              name="start_date"
              label="From"
              rules={[
                {
                  type: "object",
                  required: true,
                  message: "Please select From date!"
                }
              ]}
            >
              <DatePicker
                style={{
                  width: "100%",
                  padding: "5px 10px",
                  margin: "8px 0",
                  boxSizing: "border-box"
                }}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
            <Form.Item
              style={{
                height: "150px",
                width: "400px"
              }}
              name="end_date"
              label="To"
              rules={[
                {
                  type: "object",
                  required: true,
                  message: "Please select To date!"
                }
              ]}
            >
              <DatePicker
                style={{
                  width: "100%",
                  padding: "5px 10px",
                  margin: "8px 0",
                  boxSizing: "border-box"
                }}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
          </Row>
          <Form.Item name="status" className="collection-create-form_last-form-item" initialValue='draft'>
          <Radio.Group>
            <Radio value="draft">Save as draft</Radio>
            <Radio value="published">Publish</Radio>
          </Radio.Group>
        </Form.Item>

          {/* <FormAction> */}
          <div className="inner-wrapper">
            <Button type="primary" htmlType="submit">
              Submit Poll
            </Button>
          </div>
          {/* </FormAction> */}
        </Form>
      <Modal
        title={this.state.modalTitle}
        centered
        visible={this.state.modalVisible}
        onOk={this.handleOk}
        cancelButtonProps={{ display: 'none' }}
        width={500}
      >
        <deckgo-qrcode content={`${BASE_URL}/${this.state.uuid}`}></deckgo-qrcode>
        <div className='pollUrl'>{`${BASE_URL}/${this.state.uuid}`}</div>
        <div className='padding10'>{`Poll Code - ${this.state.uuid}`}</div>
        <div className="icons">
          <img src={fbIcon} alt="share-facebook"/>
          <img src={instagramIcon} alt="share-instagram"/>
          <img src={twitterIcon} alt="share-twitter"/>
        </div>
      </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(CreatePoll);