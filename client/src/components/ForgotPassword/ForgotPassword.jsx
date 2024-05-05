import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import { MailOutlined } from "@ant-design/icons";
import api from "../../utils/axiosInstance";

const ForgotPassword = () => {
  const onFinish = async (values) => {
    console.log(values);
  };
  return (
    <Form
      name="normal_forgot-pass"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send mail
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPassword;
