import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import "./css/CreatePoll.css";
import {
  Divider,
  Form,
  Input,
  Button,
  Radio,
  Space,
  DatePicker,
  Row
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import OptionForm from "./OptionForm";
import axios from "axios";
import moment from "moment";
const { TextArea } = Input;

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    console.log("new poll", pollData);
    console.log("epoch time", moment.unix(pollData.start_date));
    console.log("epoch time", pollData.start_date.unix());
    let start_date = pollData.start_date.unix();
    let end_date = pollData.end_date.unix();
    //return false;
    axios.defaults.headers.common["Authorization"] =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNjAwMTY4NDI1LCJleHAiOjE2MDAyNTQ4MjV9.6ZOPCwdDJSsahqBqNtRUc23q_TRII9mEFOIhXSVAHA8";
    axios
      .post(`https://localhost:3030/polls/`, {
        ...pollData,
        start_date,
        end_date,
        status: "published"
      })
      .then(res => {
        console.log("res ---->", res);
      });
  }

  render() {
    let questionArr = [1, 2];
    const onFinish = pollData => {
      console.log("Received options of poll:", pollData.options);
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
              console.log("===>", fields, add, remove);
              return (
                <div>
                  {fields.map(field => (
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
                            placeholder="Question"
                          />
                          <MinusCircleOutlined
                            style={{
                              padding: "10px 5px"
                            }}
                            onClick={() => {
                              remove(field.name);
                              console.log(field);
                            }}
                          />
                        </span>
                      </Form.Item>

                      {/* This is the Dynamic options Adder */}

                      <Form.Item>
                        <OptionForm fieldKey={field.key} />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        name={[field.name, "type"]}
                        fieldKey={[field.fieldKey, "type"]}
                        label="Type"
                        initialValue={0}
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

          {/* <FormAction> */}
          <div className="inner-wrapper">
            <Button type="primary" htmlType="submit">
              Save as draft
            </Button>
          </div>
          {/* </FormAction> */}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("CreatePoll-->", state);
  return { ...state };
};

export default connect(mapStateToProps)(CreatePoll);
