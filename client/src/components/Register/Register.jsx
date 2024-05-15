import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import useUserStore from "../../store/useUserStore";
import useErrorHandlingStore from "../../store/useErrorHandlingStore";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsError } = useErrorHandlingStore();
  const { setCurrentUser } = useUserStore();
  const onFinish = async (values) => {
    const { username, email, password, phone } = values;
    try {
      setIsLoading(true);
      form.resetFields();
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
        phone,
      });
      console.log(response);
      if (response.status === 201) {
        setCurrentUser(response.data);
        setIsLoading(false);
        toast.success("Successfully signed up !");
        navigate("/");
      } else {
        setIsLoading(false);
        setIsError({ isError: true, errorMessage: "Failed to signup." });
      }
    } catch (err) {
      setIsLoading(false);
      setIsError({ isError: true, errorMessage: "Failed to signup." });
      console.log(err);
    }
  };
  return (
    <Spin spinning={isLoading}>
      <Form
        form={form}
        name="normal_register"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
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
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your Phone!",
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Phone"
          />
        </Form.Item>
        <Form.Item>
          <div>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default Register;
