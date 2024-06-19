import { useState } from "react";
import { Row, Button, Modal, Form, Input, InputNumber, Select } from "antd";
import api from "../../utils/axiosInstance";
import useUserStore from "../../store/useUserStore";
import toast from "react-hot-toast";

const { Option } = Select;
const AddCarModal = () => {
  const { currentUser } = useUserStore();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    console.log(values);
    const car = values;
    const res = await api.post("/car-details/newCar", car, {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      toast.success("Successfully added the car !");
    } else {
      toast.error("An error occured.");
    }
  };
  return (
    <Row style={{ marginTop: "20px" }}>
      <Button size="large" onClick={showModal}>
        Add a new car
      </Button>
      <Modal
        title="Add a new car in the system"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        okButtonProps={{ htmlType: "submit" }}
      >
        <Form
          form={form}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the car name!",
              },
            ]}
          >
            <Input placeholder="Car Name" />
          </Form.Item>
          <Form.Item
            name="brand"
            rules={[
              {
                required: true,
                message: "Please the car brand!",
              },
            ]}
          >
            <Input placeholder="Car Brand" />
          </Form.Item>
          <Form.Item
            name="type"
            rules={[
              {
                required: true,
                message: "Please the car type (Ex: mini, economy, sedan) !",
              },
            ]}
          >
            <Input placeholder="Car type" />
          </Form.Item>
          <Form.Item
            name="seats"
            rules={[
              {
                required: true,
                message: "Please the number of seats !",
              },
            ]}
          >
            <InputNumber placeholder="Seats" />
          </Form.Item>
          <Form.Item
            name="doors"
            rules={[
              {
                required: true,
                message: "Please the number of doors !",
              },
            ]}
          >
            <InputNumber placeholder="Doors" />
          </Form.Item>
          <Form.Item
            name="year"
            rules={[
              {
                required: true,
                message: "Please the car year !",
              },
            ]}
          >
            <InputNumber placeholder="year" />
          </Form.Item>
          <Form.Item
            name="transmission"
            rules={[
              {
                required: true,
                message: "Please the transmission type !",
              },
            ]}
          >
            <Select placeholder="Transmission type">
              <Option value="manual">manual</Option>
              <Option value="automatic">automatic</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="pricePerDay"
            rules={[
              {
                required: true,
                message: "Please enter the price / day !",
              },
            ]}
          >
            <InputNumber placeholder="Price per day" />
          </Form.Item>
          <Form.Item
            name="pricePerWeek"
            rules={[
              {
                required: true,
                message: "Please enter the price / week !",
              },
            ]}
          >
            <InputNumber placeholder="Price per week" />
          </Form.Item>
          <Form.Item
            name="location"
            rules={[
              {
                required: true,
                message: "Please the location of the office !",
              },
            ]}
          >
            <Select placeholder="Location of office">
              <Option value="Timisoara">Timisoara</Option>
              <Option value="Bucharest">Bucharest</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="imageURL"
            rules={[
              {
                required: true,
                message: "Please the car image URL !",
              },
            ]}
          >
            <Input placeholder="Car Image URL" />
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default AddCarModal;
