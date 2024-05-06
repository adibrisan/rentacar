import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import useUserStore from "../../store/useUserStore";
import useErrorHandlingStore from "../../store/useErrorHandlingStore";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import styles from "./Login.module.css";
import { useState } from "react";

const Login = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsError } = useErrorHandlingStore();
  const { setCurrentUser } = useUserStore();
  const onFinish = async (values) => {
    const { username, password } = values;
    try {
      setIsLoading(true);
      const response = await api.post("/auth/login", { username, password });
      console.log(response);
      if (response.statusText === "OK") {
        setCurrentUser(response.data);
        setIsLoading(false);
        toast.success("Successfully signed in !");
        navigate("/");
      } else {
        setIsLoading(false);
        setIsError({ isError: true, errorMessage: "Failed to login." });
      }
    } catch (err) {
      setIsLoading(false);
      setIsError({ isError: true, errorMessage: "Failed to login." });
      console.log(err);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <Form
        form={form}
        name="normal_login"
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
        <Form.Item>
          <div className={styles.rememberOrForgotPassword}>
            <Link to="/forgot-password">Forgot password</Link>
          </div>
        </Form.Item>

        <Form.Item>
          <div className={styles.loginOrRegister}>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
            <div>
              Or <Link to="/signup">register now!</Link>
            </div>
          </div>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default Login;
