import React, { Component } from "react";
import { connect } from "react-redux";
import { getPoll } from "./../actions/index";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  AreaChartOutlined,
  PieChartOutlined
} from "@ant-design/icons";
import { Route, Switch, Link, BrowserRouter as Router} from 'react-router-dom';
import { history } from '../store';
import Dashboard from './Dashboard'
import CreatePoll from './CreatePoll'
import ListPoll from './ListPoll'

const { Header, Sider, Content } = Layout;

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
    let pathname = this.props.router.location.pathname;
    return (
      <Router history={history}>
        <div className="App">
          <Layout>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={pathname}>
                <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
                  <Link to='/dashboard'>Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="/create-poll" icon={<AreaChartOutlined />}>
                  <Link to='/create-poll'>Create Poll</Link>
                </Menu.Item>
                <Menu.Item key="/polls" icon={<PieChartOutlined />}>
                  <Link to='/polls'>View Poll</Link>
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
              >
                <Switch>
                  <Route exact path='/dashboard' component={Dashboard} />
                  <Route exact path='/create-poll' component={CreatePoll} />
                  <Route exact path='/polls' component={ListPoll} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </div>
      </Router>
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
