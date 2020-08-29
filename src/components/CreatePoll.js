import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import './css/CreatePoll.css'
import { Divider, Form, Input, Button, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

class CreatePoll extends Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 0 },
    },
  };

  formTitleRef = createRef()
  
  savePoll(pollData) {
    console.log('new poll', pollData)
  }

  render() {
    const onFinish = pollData => {
      console.log('Received options of poll:', pollData.options);
      this.savePoll(pollData);
    };
    return (
      <div className='create-poll-wrapper'>
        <h1 className=''>Create Poll</h1>
        <Divider/>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          size='small'
          onFinish={onFinish}
        >
          <Form.Item 
            label="Question"
            validateTrigger={['onChange', 'onBlur']}
            rules={[
              {
                required: true,
                whitespace: false,
                message: "Please input question.",
              },
            ]}
            name="question"
          >
            <Input ref={this.formTitleRef} placeholder="Question"/>
          </Form.Item>
          <div className="options">
            <Form.List name="options">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0 ? this.formItemLayout : this.formItemLayoutWithOutLabel)}
                        label={index === 0 ? 'Options' : ''}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please input option or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder={"option "+ (index+1)} style={{ width: '60%' }} />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        style={{ width: '60%' }}
                      >
                        <PlusOutlined /> Add Option
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </div>
          <Form.Item label="Type" name="type" initialValue='single'>
            <Radio.Group>
              <Radio.Button value="single">Single</Radio.Button>
              <Radio.Button value="multiple">Multiple</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("CreatePoll-->", state);
  return { ...state };
};

export default connect(
  mapStateToProps
)(CreatePoll);
