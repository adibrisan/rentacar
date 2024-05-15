import { useState } from "react";
import {
  Upload,
  Button,
  Space,
  List,
  Row,
  Col,
  Spin,
  Input,
  Form,
  Card,
} from "antd";
import api from "../../utils/axiosInstance";
import useErrorHandlingStore from "../../store/useErrorHandlingStore";
import useUserStore from "../../store/useUserStore";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useUserStore();
  const { setIsError } = useErrorHandlingStore();
  const [form] = Form.useForm();
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
            const res = JSON.parse(data);
            setIsLoadingImg(false);
            const mergedData = res?.reduce((acc, obj) => {
              for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                  acc[key] = obj[key];
                }
              }
              return acc;
            }, {});
            const processedData = Object.entries(mergedData);
            processedData.forEach(([key, value]) => {
              form.setFieldValue(key, value);
            });
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

  const onFinish = (values) => {
    if (!values["CATEGORY"].includes("B")) {
      setIsError({
        isError: true,
        errorMessage:
          "You have uncompleted data or your license do not meet our policies.",
      });
    } else {
      const userProfile = { hasProfile: true, ...values };
      console.log(userProfile, currentUser._id);
      api
        .put(`/updateProfile/${currentUser._id}`, userProfile)
        .then((res) => {
          console.log("code", res);
          if (res.status === 200) {
            toast.success("Updated profile !");
            const user = { ...currentUser, ...userProfile };
            setCurrentUser(user);
          } else {
            setIsError({
              isError: true,
              errorMessage: "Error updating user profile.",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setIsError({
            isError: true,
            errorMessage: "Internal server error.",
          });
        });
    }
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
            header={<div>Add license photo to complete User Info</div>}
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
      <Col xs={24} md={24} lg={7}>
        <Form
          form={form}
          name="normal_register"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
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
                message:
                  "Please input your Expiration Date for driving license!",
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
                message: "Please attach a photo with your driving license!",
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
      {currentUser.hasProfile && (
        <Col xs={24} md={24} lg={7}>
          <Card title="Your User Profile">
            <ul style={{ fontSize: "20px" }}>
              <li>Username: {currentUser.username}</li>
              <li>Phone: {currentUser.phone}</li>
              <li>COUNTRY: {currentUser.COUNTRY}</li>
              <li>SURNAME: {currentUser.SURNAME}</li>
              <li>NAME: {currentUser.NAME}</li>
              <li>EXPIRATION DATE: {currentUser.EXP}</li>
              <li>Driving license Category: {currentUser.CATEGORY}</li>
            </ul>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default ProfilePage;
