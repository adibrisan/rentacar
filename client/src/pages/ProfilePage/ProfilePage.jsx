import { useState } from "react";
import { Upload, Button, Space, List, Row, Col, Spin, Input, Form } from "antd";

const ProfilePage = () => {
  const [base64Image, setBase64Image] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const mergedData = userData?.reduce((acc, obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }
    }
    return acc;
  }, {});
  const handleBeforeUpload = (file) => {
    setIsLoadingImg(true);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBase64Image(reader.result);
        const base64Image = reader.result;
        fetch("http://localhost:9000/process-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ base64Image }),
        })
          .then((response) => {
            if (!response.ok) {
              setIsLoadingImg(false);
              throw new Error("Network response was not ok");
            }
            return response.text();
          })
          .then((data) => {
            console.log("Server response:", data);
            setUserData(JSON.parse(data));
            setIsLoadingImg(false);
          })
          .catch((error) => {
            setIsLoadingImg(false);
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
        setIsLoadingImg(false);
        resolve(true);
      };
      reader.onerror = (error) => {
        setIsLoadingImg(false);
        reject(error);
      };
    });
  };

  return (
    <Row style={{ padding: "20px" }} gutter={[30, 30]}>
      <Col xs={24} md={24} lg={5}>
        <Space direction="vertical">
          <Upload beforeUpload={handleBeforeUpload} showUploadList={false}>
            <Button type="primary" size="large">
              Upload Image
            </Button>
          </Upload>
          <List
            loading={isLoadingImg}
            header={<div>Add license photo to auto-complete User Info</div>}
            bordered
            dataSource={Object.keys(mergedData)}
            renderItem={(key) => (
              <List.Item>
                <strong>{key}</strong>: {mergedData[key]}
              </List.Item>
            )}
          />
        </Space>
      </Col>
      <Col xs={24} md={24} lg={19}>
        <Form
          // form={form}
          name="normal_register"
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          style={{ maxWidth: "500px" }}
        >
          <Form.Item
            name="COUNTRY"
            rules={[
              {
                required: true,
                message: "Please input your Country!",
              },
            ]}
          >
            <Input placeholder="Country" />
          </Form.Item>
          <Form.Item
            name="SURNAME"
            rules={[
              {
                required: true,
                message: "Please input your Surname!",
              },
            ]}
          >
            <Input placeholder="Surname" />
          </Form.Item>
          <Form.Item
            name="NAME"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="EXP"
            rules={[
              {
                required: true,
                message: "Please input your Expiration Date!",
              },
            ]}
          >
            <Input placeholder="Expiration Date" />
          </Form.Item>
          <Form.Item
            name="CATEGORY"
            rules={[
              {
                required: true,
                message: "Please input your driving license category!",
              },
            ]}
          >
            <Input placeholder="Driving license Category" />
          </Form.Item>
          <Form.Item>
            <div>
              <Button type="primary" size="large" htmlType="submit">
                Register Profile
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfilePage;
