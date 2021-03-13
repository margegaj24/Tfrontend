import { Layout, Button, Space } from "antd";
import AddStudentForm from "../forms/addStudent";
import AddCourseForm from "../forms/addCourse";
import { useState } from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";

function Header() {
  const { Header } = Layout;
  const [studentFormVisible, setStudentFormVisible] = useState(false);
  const [courseFormVisible, setCourseFormVisible] = useState(false);

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Space size="large" align="center">
        <Button type="primary" onClick={() => setStudentFormVisible(true)}>
          Add Student
        </Button>
        <AddStudentForm
          visible={studentFormVisible}
          onCancel={() => setStudentFormVisible(false)}
          onCreate={() => setStudentFormVisible(false)}
        />
        <Button type="primary" onClick={() => setCourseFormVisible(true)}>
          Add Course
        </Button>
        <AddCourseForm
          visible={courseFormVisible}
          onCancel={() => setCourseFormVisible(false)}
          onCreate={() => setCourseFormVisible(false)}
        ></AddCourseForm>
        <AmplifySignOut />
      </Space>
    </Header>
  );
}

export default Header;
