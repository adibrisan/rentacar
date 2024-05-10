import { Row, Col, Spin } from "antd";
import SelectFilter from "./SelectFilter";
import useGetCarFilters from "../../hooks/useGetCarFilters";

const CarFilter = () => {
  const { carFilters, isLoading: isCarFiltersLoading } = useGetCarFilters();

  return (
    <Row
      style={{ margin: "25px 25px" }}
      justify="center"
      align="middle"
      gutter={100}
    >
      {isCarFiltersLoading ? (
        <Spin spinning={isCarFiltersLoading} />
      ) : (
        Object.entries(carFilters).map(([filter, filterValues]) => {
          return (
            <Col key={filter}>
              <SelectFilter label={filter} values={filterValues} />
            </Col>
          );
        })
      )}
    </Row>
  );
};

export default CarFilter;
