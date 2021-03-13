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
    title: "Surname",
    dataIndex: "surname",
  },
  {
    title: "Courses",
    dataIndex: "courses",
    render: (courses) => <p>{courses.length}</p>,
  },
  {
    title: "Action",
    dataIndex: "",
    render: (student) => (
      <Space size="middle" align="center">
        <Button>View</Button>
        <Button type="primary">Edit</Button>
        <Button
          type="danger"
          onClick={() => {
            axios
              .delete("https://xro4owx9f2.execute-api.eu-west-2.amazonaws.com/dev/students/" + student._id)
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

const Students = () => {
  const [data, setData] = useState([]);

  useEffect(() => loadStudents(), []);

  const loadStudents = async () => {
    const students = await axios.get("https://xro4owx9f2.execute-api.eu-west-2.amazonaws.com/dev/students");
    setData(students.data);
  };

  if (data.length === 0) return <h1>Loading student data...</h1>;

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
      //onChange={this.onChange}
    />
  );
};

// onChange(pagination, filters, sorter, extra) {
//   console.log("params", pagination, filters, sorter, extra);
// }

export default Students;
