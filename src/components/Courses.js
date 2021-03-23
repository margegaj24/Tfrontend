import React from "react";
import axios from "axios";
import { Table, Button, Space } from "antd";
import { useState, useEffect } from "react";

const columns = [
  {
    title: "Course Name",
    dataIndex: "name",
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Students",
    dataIndex: "students",
    render: (students) => <p>{students.length}</p>,
  },
  {
    title: "Action",
    dataIndex: "",
    render: (course) => (
      <Space size="middle" align="center">
        <Button>View</Button>
        <Button type="primary">Edit</Button>
        <Button
          type="danger"
          onClick={() => {
            axios
              .delete("https://57zzkobn95.execute-api.eu-west-2.amazonaws.com/dev/courses/" + course._id)
              .then((response) => {
                if (response.data.error) alert(response.data.error);
                else alert(response.data.message);
              });
          }}
        >
          Delete
        </Button>
      </Space>
    ),
  },
];

const Courses = () => {
  const [data, setData] = useState([]);

  useEffect(() => loadCourses(), []);

  const loadCourses = async () => {
    const courses = await axios.get("https://57zzkobn95.execute-api.eu-west-2.amazonaws.com/dev/courses");
    setData(courses.data);
  };

  if (data.length === 0) return <h1>Loading courses...</h1>;

  return (
    <Table
      pagination={{
        simple: true,
        defaultPageSize: 5,
        defaultCurrent: 1,
        total: data.length,
      }}
      columns={columns}
      dataSource={data}
      //onChange={loadCourses()}
    />
  );
};

export default Courses;
