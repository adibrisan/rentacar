import { Row, Col, DatePicker } from "antd";
import useCarMultiFilter from "../../store/useCarMultiFilter";
import { DATE_FORMAT } from "../../utils/appConstants";

const { RangePicker } = DatePicker;
const CarFilter = () => {
  const { setRentPeriod } = useCarMultiFilter();
  return (
    <Row style={{ margin: "25px 25px" }} justify="center" align="middle">
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
