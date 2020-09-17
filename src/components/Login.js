import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Form, Input, Button, Alert,message } from "antd";

import { history } from "../store";
import { setSecurity } from "./../actions/userAction";
import {MESSAGE} from './../constants/dictionary';

class Login extends Component {
  state = {
    errorMessage : ''
  };
  componentDidMount() {
    let accessToken = sessionStorage.getItem("accessToken");
    console.log("accessToken000", accessToken);
    if (accessToken !== "") {
        this.props.history.push("/");
    }
  }
  componentWillReceiveProps(nextProps) {
    // if(nextProps.user.name)
    //     this.props.history.push("/");
    // else
    //     this.props.history.push("/login");
  }
  componentDidUpdate(prevProps) {
    console.log("componentsDidUpdate prevProps--->", prevProps);
    let { username } = this.props.user !== undefined ? this.props.user : "";
    let { id } = this.props.user !== undefined ? this.props.user : "";
    let accessToken = sessionStorage.getItem("accessToken");
    console.log("accessToken000", accessToken);
    if (username !== "" && id !== "" && accessToken !== "") {
      if (this.props.user.errors.code !== 1) {
        this.props.history.push("/");
      }
    } else {
      //this.setState({errorMessage:MESSAGE.authError})
      //this.props.history.push("/login");
      message.error(MESSAGE.authError);
    }
  }
  onFinishFailed = errorInfo => {};
  onFinish = values => {
    this.props.setSecurity(values);
  };
  render() {
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
        <div className='login-background'>
          <section className="login">
          {this.state.errorMessage !=='' ?
          <Alert message="Error Text" style={{top: '-15px'}} type="error" /> :null
        }
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
                label={<label style={{ color: "#fff" }}>Email</label>}
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!"
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
          </section>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};
const mapDispatchToProps = {
  setSecurity
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
