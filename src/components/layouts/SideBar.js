import { Layout, Menu } from "antd";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

function SideBar() {
  return (
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
        <Menu.Item key="1" icon={<UserOutlined />}>
          Students
          <Link to="/students" />
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          Courses
          <Link to="/courses" />
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideBar;
