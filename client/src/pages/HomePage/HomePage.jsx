import { Row, Col, Spin } from "antd";
import CarCard from "../../components/CarCard/CarCard";
import CarFilter from "../../components/CarFilter/CarFilter";
import useGetCarList from "../../hooks/useGetCarList";

const HomePage = () => {
  const { carList: cars, isLoading } = useGetCarList();
  return (
    <main>
      <CarFilter />
      <Spin spinning={isLoading}>
        <Row
          justify="center"
          align="middle"
          style={{ margin: "25px 25px" }}
          gutter={20}
        >
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
