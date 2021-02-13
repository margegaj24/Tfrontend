import "./App.css";
import "antd/dist/antd.css";
import React from "react";
import { Layout } from "antd";
import Students from "./components/Students";
import Courses from "./components/Courses";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideBar from "./components/layouts/SideBar";
import Header from "./components/layouts/Header";

function App() {
  const { Content, Footer } = Layout;

  return (
    <div className="App">
      <Router>
        <Layout>
          <SideBar />
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header />
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <Route exact path="/students" component={Students} />
              <Route exact path="/courses" component={Courses} />
              <div className="site-layout-background" style={{ padding: 24, textAlign: "center" }}></div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
        ,
      </Router>
    </div>
  );
}

export default App;
