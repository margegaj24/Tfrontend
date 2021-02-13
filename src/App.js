import "./App.css";
import "antd/dist/antd.css";
import React from "react";
import { Layout, Menu } from "antd";
import data from "./menu.json";
import { TeamOutlined, MessageOutlined, FormOutlined } from "@ant-design/icons";
import Students from "./components/Students";
import Courses from "./components/Courses";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
//import babel from "babel-core";
//var babel = require("babel-core");

function App() {
  const { Header, Content, Footer, Sider } = Layout;

  const menulist = data.map((obj, key) => (
    <Menu.Item key={key} icon={<TeamOutlined />}>
      {obj.menu_title}
      <Link to={obj.path} />
    </Menu.Item>
  ));

  return (
    <div className="App">
      <Router>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
              {menulist}
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <DatePicker
                defaultValue={moment()}
                format={"DD/MM/YYYY"}
                picker={"date"}
              />
              <Route path="/students" component={Students} />
              <Route path="/courses" component={Courses} />
              <div
                className="site-layout-background"
                style={{ padding: 24, textAlign: "center" }}
              ></div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
        ,
      </Router>
    </div>
  );
}

export default App;
