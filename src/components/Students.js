import React from "react";
import axios from "axios"
import { Table } from "antd";
import {useState, useEffect} from "react";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
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
    title: "Action",
    dataIndex: "",
  },
];

const Students = () => {
  const [data, setData] = useState([]);

  useEffect(() => loadStudents(), []);
  
  const loadStudents = async () => {
    const students = await axios.get('http://192.168.1.142:5000/students')
    //console.log(students)
    setData(students.data)
  }

  if (data.length == 0) return <h1>Loading student data...</h1>;
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
}

// onChange(pagination, filters, sorter, extra) {
//   console.log("params", pagination, filters, sorter, extra);
// }

export default Students;