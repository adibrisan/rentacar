import { useParams } from "react-router-dom";
import { Card, Form, Input, Button, Spin, Row, Col } from "antd";
import { LockOutlined } from "@ant-design/icons";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const { resetToken } = useParams();
  const onFinish = async (values) => {
    const { password } = values;
    try {
      await api.post(`/auth/reset-password/${resetToken}`, { password });
      toast.success("Password changed !");
      form.resetFields();
    } catch (err) {
      console.log(err);
      toast.error(`${err}`);
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col>
        <Card
          title={<span style={{ fontSize: "20px" }}>Reset Password</span>}
          style={{ width: "500px" }}
        >
          <Form
            form={form}
            name="normal_change-pass"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your new Password!",
                },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="New Password"
              />
            </Form.Item>
            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                Proceed
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPassword;
