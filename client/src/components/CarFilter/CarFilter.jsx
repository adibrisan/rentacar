import { Row, Col, DatePicker, Spin } from "antd";
import SelectFilter from "./SelectFilter";
import useCarMultiFilter from "../../store/useCarMultiFilter";
import useGetCarFilters from "../../hooks/useGetCarFilters";
import { DATE_FORMAT } from "../../utils/appConstants";

const { RangePicker } = DatePicker;
const CarFilter = () => {
  const { setRentPeriod } = useCarMultiFilter();
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

      <Col>
        <RangePicker
          size="large"
          format={DATE_FORMAT}
          onChange={(_date, dateString) => setRentPeriod(dateString)}
        />
      </Col>
    </Row>
  );
};

export default CarFilter;
