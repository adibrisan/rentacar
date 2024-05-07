import { Row, Col } from "antd";
import CarCard from "../../components/CarCard/CarCard";

const HomePage = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <main>
      <Row style={{ margin: "25px 25px" }} gutter={20}>
        {arr.map((item) => (
          <Col style={{ marginTop: "20px" }}>
            <CarCard />
          </Col>
        ))}
      </Row>
    </main>
  );
};

export default HomePage;
