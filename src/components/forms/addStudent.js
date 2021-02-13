import React from "react";
import { Modal, Form, Input } from "antd";
import axios from "axios";

const AddStudentForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new student"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log(values);
            axios
              .post("http://localhost:5000/students", values)
              .then((response) => {
                if (response.data.error) alert(response.data.error);
                else alert(response.data.message);
              })
              .catch((error) => alert(error.message));
            onCreate();
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
      </Form>
    </Modal>
  );
};

export default AddStudentForm;
