import React, { Component } from "react";
import { connect } from "react-redux";
import { getPoll } from "./../actions/index";
import { Layout, Menu, Anchor } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  AreaChartOutlined,
  PieChartOutlined
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Link } = Anchor;

class MainApp extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    console.log("main render-->", this.props);
    return (
      <div className="App">
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                Home
              </Menu.Item>
              <Menu.Item key="2" icon={<AreaChartOutlined />}>
                Create Poll
              </Menu.Item>
              <Menu.Item key="3" icon={<PieChartOutlined />}>
                List of Polls
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: this.toggle
                }
              )}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280
              }}
            ></Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("MainApp-->", state);
  return { ...state };
};
const mapDispatchToProps = {
  getPoll: getPoll
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp);
