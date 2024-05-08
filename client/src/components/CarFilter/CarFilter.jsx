import { Row, Col, DatePicker, Cascader } from "antd";
import useCarMultiFilter from "../../store/useCarMultiFilter";
import useGetCarFilters from "../../hooks/useGetCarFilters";
import { DATE_FORMAT } from "../../utils/appConstants";

const { RangePicker } = DatePicker;
const CarFilter = () => {
  const { setRentPeriod } = useCarMultiFilter();
  const { carFilterTreeData, isLoading: isCarFiltersLoading } =
    useGetCarFilters();
  return (
    <Row
      style={{ margin: "25px 25px" }}
      justify="center"
      align="middle"
      gutter={100}
    >
      <Col>
        <Cascader
          placeholder="Please select"
          options={carFilterTreeData}
          loading={isCarFiltersLoading}
          multiple
          size="large"
          maxTagCount={3}
          changeOnSelect={true}
          onChange={(_value, selectedOptions) => console.log(selectedOptions)}
          style={{ width: "300px" }}
        />
      </Col>
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
