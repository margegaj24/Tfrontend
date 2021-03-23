import React from "react";
import { Modal, Form, Input } from "antd";
import axios from "axios";

const AddCourseForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new course"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log(values);
            axios
              .post("https://57zzkobn95.execute-api.eu-west-2.amazonaws.com/dev/courses", values)
              .then((response) => {
                if (response.data.error) alert(response.data.error);
                else alert(response.data.message);
              })
              .catch((error) => alert("Something wrong happened..."));
            onCreate();
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed: ", info);
          });
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
          label="Course Name"
          rules={[
            {
              required: true,
              message: "Please input the name of student!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCourseForm;
