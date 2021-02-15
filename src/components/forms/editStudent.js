import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const EditStudentForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [availableCourses, setAvailableCourses] = useState([]);

  const loadAvailableCourses = async () => {
    var courses = await axios.get("http://localhost:5000/courses/");
    courses.forEach((course) => delete course.students);
    setAvailableCourses(courses);
  };

  useEffect(() => loadAvailableCourses(), []);

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
          .post("http://localhost:5000/addCoursesToStudent/" + submitedValues.studentId, submitedValues.courses)
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
        <Form.Item name="courses" label="Select Courses">
          <Select mode="tags" style={{ width: "100%" }} tokenSeparators={["   "]}>
            {availableCourses}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditStudentForm;
