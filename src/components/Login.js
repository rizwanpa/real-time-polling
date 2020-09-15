import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Form, Input, Button, Checkbox } from "antd";

import { history } from "../store";
import { setSecurity } from './../actions/userAction';

class Login extends Component {
  state = {};
  componentDidMount() {
    //this.props.history.push("/");
  }
  componentWillReceiveProps(nextProps) {
    console.log('next+++++',nextProps.user.name);
    // if(nextProps.user.name)
    //     this.props.history.push("/");
    // else
    //     this.props.history.push("/login");
  }
  componentDidUpdate(prevProps){
      console.log('componentDidUpdate--->',prevProps,this.props);
      console.log(prevProps.user.errors.code != this.props.user.errors.code);
      console.log('cosnditions',prevProps.user.errors.code !== 1);
      if(prevProps.user.username != this.props.user.username){
          if(this.props.user.errors.code !== 1 ){
            this.props.history.push("/"); 
          }
      }else{
        this.props.history.push("/login");
      }
  }
  onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  onFinish = values => {
    console.log("Success:", values);
    this.props.setSecurity(values);
  };
  render() {
    console.log("login props--->", this.props);
    const layout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 8
      }
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 8
      }
    };
    return (
      <Router history={history}>
        <div
          style={{
            margin: "10%",
            padding: "20px",
            background: "#00124d",
            opacity: "0.9",
            marginLeft: "15%",
            marginRight: "15%"
          }}
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label={<label style={{ color: "#fff" }}>Username</label>}
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<label style={{ color: "#fff" }}>Password</label>}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!"
                }
              ]}
            >
              <Input.Password />
            </Form.Item>

            {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  console.log("login-->", state);
  return { user : state.user };
};
const mapDispatchToProps = {
    setSecurity
  };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
