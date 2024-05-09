import { useParams } from "react-router-dom";
import { Row, Col, Spin, Typography, Tag } from "antd";
import useGetCarById from "../../hooks/useGetCarById";
import styles from "./CarDetailsPage.module.css";

const { Title } = Typography;

const CarDetailsPage = () => {
  const { carId } = useParams();
  const { carDetails, isLoading } = useGetCarById(carId);
  return isLoading ? (
    <Spin spinning={isLoading} />
  ) : (
    !!carDetails && (
      <Row style={{ margin: "20px 50px" }} gutter={20} align="bottom">
        <Col style={{ backgroundColor: "red" }} span={3}>
          <Row align="middle">
            <Title style={{ color: "#1677FF", marginRight: "20px" }}>
              {carDetails.brand}
            </Title>
            <Title level={3} style={{ color: "gray" }}>
              {carDetails.name}
            </Title>
          </Row>
        </Col>
        <Col style={{ backgroundColor: "blue" }} span={16}>
          dasdasdsa
        </Col>
      </Row>
    )
  );
};

export default CarDetailsPage;
