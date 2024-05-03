import { useState } from "react";
import { Upload, Button, Space, List, Row, Col } from "antd";

const TestFeature = () => {
  const [base64Image, setBase64Image] = useState(null);
  const [data, setData] = useState([]);
  const mergedData = data?.reduce((acc, obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }
    }
    return acc;
  }, {});

  const handleBeforeUpload = (file) => {
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
              throw new Error("Network response was not ok");
            }
            return response.text();
          })
          .then((data) => {
            console.log("Server response:", data);
            setData(JSON.parse(data));
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
        resolve(true);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Row style={{ padding: "20px" }}>
      <Col>
        <Space direction="vertical">
          <Upload beforeUpload={handleBeforeUpload} showUploadList={false}>
            <Button>Upload Image</Button>
          </Upload>
          {base64Image && (
            <div>
              <h2>Image Preview</h2>
              <img
                src={base64Image}
                alt="Uploaded"
                style={{ maxWidth: "700px" }}
              />
            </div>
          )}
          <List
            header={<div>User Info</div>}
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
    </Row>
  );
};

export default TestFeature;
