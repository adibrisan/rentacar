import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import { MailOutlined } from "@ant-design/icons";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { email } = values;
    try {
      await api.post("/auth/forgot-password", { email });
      navigate("/");
      toast.success("Email sent!");
      form.resetFields();
    } catch (err) {
      console.log(err);
      toast.error(`${err}`);
    }
  };
  return (
    <Form
      form={form}
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
