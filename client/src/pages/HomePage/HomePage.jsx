import { Row, Col, Spin } from "antd";
import CarCard from "../../components/CarCard/CarCard";
import useGetCarList from "../../hooks/useGetCarList";

const HomePage = () => {
  const { carList: cars, isLoading } = useGetCarList();
  return (
    <main>
      <Spin spinning={isLoading}>
        <Row justify="center" style={{ margin: "25px 25px" }} gutter={20}>
          {cars.map((car) => (
            <Col key={car._id} style={{ marginTop: "20px" }}>
              <CarCard carDetails={car} />
            </Col>
          ))}
        </Row>
      </Spin>
    </main>
  );
};

export default HomePage;
