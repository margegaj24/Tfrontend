import React from "react";
import axios from "axios";
import { Table, Button, Space } from "antd";
import { useState, useEffect } from "react";

const columns = [
  {
    title: "Name",
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
    render: (text, record) => (
      <Space size="middle" align="center">
        <Button>View</Button>
        <Button type="primary">Edit</Button>
        <Button type="danger">Delete</Button>
      </Space>
    ),
  },
];

const Students = () => {
  const [data, setData] = useState([]);

  useEffect(() => loadCourses(), []);

  const loadCourses = async () => {
    const courses = await axios.get("http://localhost:5000/courses");
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
      onChange={loadCourses()}
    />
  );
};

export default Students;
