import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const AddStudentForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [availableCourses, setAvailableCourses] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => loadAvailableCourses(), []);

  const loadAvailableCourses = async () => {
    var response = await axios.get("http://localhost:5000/courses");
    var courses = [];
    var allCourses = [];
    response.data.forEach((course, index) => {
      courses.push(<Option key={index}>{course.name}</Option>);
      allCourses.push(course);
    });
    setAvailableCourses(allCourses);
    setCourseOptions(courses);
  };

  return (
    <Modal
      visible={visible}
      title="Create a new student"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        var submitedValues = form.getFieldsValue();

        submitedValues.courses = submitedValues.courses.map((indexEl) => availableCourses[parseInt(indexEl)]._id);
        console.log(submitedValues);
        axios
          .post("http://localhost:5000/students", submitedValues)
          .then((response) => {
            if (response.data.error) alert(response.data.error);
            else alert(response.data.message);
          })
          .catch((error) => alert(error.message));
        onCreate();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name of student!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="surname"
          label="Surname"
          rules={[
            {
              required: true,
              message: "Please input the surname of student!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="courses" label="Select Courses">
          <Select mode="tags" style={{ width: "100%" }} tokenSeparators={["   "]}>
            {courseOptions}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddStudentForm;
