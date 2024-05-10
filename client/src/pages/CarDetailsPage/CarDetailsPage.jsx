import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Spin,
  Typography,
  Flex,
  Grid,
  Image,
  Space,
  DatePicker,
  Button,
  InputNumber,
  Popover,
} from "antd";
import useGetCarById from "../../hooks/useGetCarById";
import { IoLogoModelS } from "react-icons/io";
import { PiSeatDuotone } from "react-icons/pi";
import { GiCarDoor } from "react-icons/gi";
import { TbManualGearboxFilled } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { DATE_FORMAT } from "../../utils/appConstants";
import useCarMultiFilter from "../../store/useCarMultiFilter";
import styles from "./CarDetailsPage.module.css";
import { useEffect, useState } from "react";

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const toolBarRenderer = {
  toolbarRender: (
    _,
    { transform: { scale }, actions: { onZoomOut, onZoomIn } }
  ) => (
    <Space size={12} className="toolbar-wrapper">
      <ZoomOutOutlined
        style={{ fontSize: "40px" }}
        disabled={scale === 1}
        onClick={onZoomOut}
      />
      <ZoomInOutlined
        style={{ fontSize: "40px" }}
        disabled={scale === 50}
        onClick={onZoomIn}
      />
    </Space>
  ),
};

const CarDetailsPage = () => {
  const { setRentPeriod, rentPeriod } = useCarMultiFilter();
  const [orderNumber, setOrderNumber] = useState(1);
  const [isInvalid, setIsInvalid] = useState(false);
  const { sm } = useBreakpoint();
  const { carId } = useParams();
  const { carDetails, isLoading } = useGetCarById(carId);

  useEffect(() => {
    if (rentPeriod[0] && rentPeriod[1]) {
      setIsInvalid(false);
    }
  }, [rentPeriod]);

  return isLoading ? (
    <Spin spinning={isLoading} />
  ) : (
    !!carDetails && (
      <Row style={{ margin: "20px 100px" }} gutter={20} align="middle">
        <Col xs={24} sm={24} md={24} lg={5}>
          <Row align="middle" style={{ marginBottom: "40px" }}>
            <Title
              level={!sm ? 3 : 1}
              style={{ color: "#1677FF", marginRight: "20px" }}
            >
              {carDetails.brand}
            </Title>
            <Title level={!sm ? 3 : 6} style={{ color: "gray" }}>
              {carDetails.name}
            </Title>
          </Row>
          <Row>
            <Flex vertical gap={40}>
              <Flex vertical={!sm} align="center" gap={20}>
                <IoLogoModelS size={50} />
                <Text keyboard style={{ fontSize: "20px" }}>
                  {carDetails.type}
                </Text>
              </Flex>
              <Flex vertical={!sm} align="center" gap={20}>
                <PiSeatDuotone size={50} />
                <Text keyboard style={{ fontSize: "20px" }}>
                  Number of seats: {carDetails.seats}
                </Text>
              </Flex>
              <Flex vertical={!sm} align="center" gap={20}>
                <GiCarDoor size={50} />
                <Text keyboard style={{ fontSize: "20px" }}>
                  Number of doors: {carDetails.doors}
                </Text>
              </Flex>
              <Flex vertical={!sm} align="center" gap={20}>
                <FcCalendar size={50} />
                <Text keyboard style={{ fontSize: "20px" }}>
                  Year: {carDetails.year}
                </Text>
              </Flex>
              <Flex vertical={!sm} align="center" gap={20}>
                <TbManualGearboxFilled size={50} />
                <Text keyboard style={{ fontSize: "20px" }}>
                  Transmission: {carDetails.transmission}
                </Text>
              </Flex>
              <Flex vertical={!sm} align="center" gap={20}>
                <FaLocationDot size={50} />
                <Text keyboard style={{ fontSize: "20px" }}>
                  Location: {carDetails.location}
                </Text>
              </Flex>
            </Flex>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={9}>
          <Flex vertical gap={20}>
            <Flex align="center" gap={20}>
              <label className={styles.periodLabel} htmlFor="rangePicker">
                Select a date range for renting period
              </label>
              <Popover
                open={isInvalid}
                title={<div style={{ fontSize: "20px" }}>Error message</div>}
                content={
                  <div style={{ fontSize: "20px", color: "red" }}>
                    Please pick a range for your rental.
                  </div>
                }
              >
                <RangePicker
                  id="rangePicker"
                  size="large"
                  format={DATE_FORMAT}
                  onChange={(_date, dateString) => setRentPeriod(dateString)}
                  status={isInvalid ? "error" : undefined}
                />
              </Popover>
            </Flex>
            <Flex align="center" gap={20}>
              <label className={styles.periodLabel} htmlFor="orderNumber">
                How many cars like this would you want ?
              </label>
              <InputNumber
                id="orderNumber"
                size="large"
                min={1}
                max={15}
                defaultValue={1}
                onChange={(value) => setOrderNumber(value)}
              />
            </Flex>
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={24} lg={10}>
          <Image
            src={carDetails.imageURL}
            placeholder="Loading car image..."
            preview={toolBarRenderer}
            height={200}
          />
        </Col>
        <Row
          style={{
            width: "100%",
            marginTop: "60px",
          }}
        >
          <Col span={24}>
            <Flex justify="center">
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  if (!rentPeriod[0] && !rentPeriod[1]) {
                    setIsInvalid(true);
                  }
                }}
              >
                I want this car
              </Button>
            </Flex>
          </Col>
        </Row>
      </Row>
    )
  );
};

export default CarDetailsPage;
