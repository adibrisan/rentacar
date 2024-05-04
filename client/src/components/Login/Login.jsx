import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import api from "../../utils/axiosInstance";
import styles from "./Login.module.css";

const Login = () => {
  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    const { username, password } = values;
    try {
      const response = await api.post("/auth/login", { username, password });
      console.log(response);
      if (response.statusText === "OK") {
        // localStorage.setItem("accessToken",response.data.accessToken);
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ fontSize: "18px" }}>Remember me</Checkbox>
          </Form.Item>

          <a href="">Forgot password</a>
        </div>
      </Form.Item>

      <Form.Item>
        <div className={styles.loginOrRegister}>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          <div>
            Or <a href="">register now!</a>
          </div>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Login;
