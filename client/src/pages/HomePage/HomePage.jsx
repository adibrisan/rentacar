import { useState } from "react";
import { Row, Col, Spin, Pagination } from "antd";
import CarCard from "../../components/CarCard/CarCard";
import CarFilter from "../../components/CarFilter/CarFilter";
import useGetCarList from "../../hooks/useGetCarList";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const {
    carList: cars,
    isLoading,
    totalCars,
  } = useGetCarList(currentPage, pageSize);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

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
        <Row justify="end" style={{ marginRight: "23vw" }}>
          <Pagination
            showSizeChanger
            defaultPageSize={10}
            current={currentPage}
            pageSizeOptions={[5, 10, 20, 50]}
            total={totalCars}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </Row>
      </Spin>
    </main>
  );
};

export default HomePage;
