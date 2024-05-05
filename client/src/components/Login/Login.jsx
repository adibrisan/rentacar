import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import useUserStore from "../../store/useUserStore";
import api from "../../utils/axiosInstance";
import styles from "./Login.module.css";

const Login = () => {
  const { setCurrentUser } = useUserStore();
  const onFinish = async (values) => {
    const { username, password } = values;
    try {
      const response = await api.post("/auth/login", { username, password });
      console.log(response);
      if (response.statusText === "OK") {
        setCurrentUser(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
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
          // onChange={(e) => setUsername(e.target.value)}
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
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          // onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <div className={styles.rememberOrForgotPassword}>
          <Link to="">Forgot password</Link>
        </div>
      </Form.Item>

      <Form.Item>
        <div className={styles.loginOrRegister}>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          <div>
            Or <Link to="">register now!</Link>
          </div>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Login;
