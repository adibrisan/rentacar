import { useParams } from "react-router-dom";
import { Row, Col, Spin, Typography, Flex, Grid, Image, Space } from "antd";
import useGetCarById from "../../hooks/useGetCarById";
import { IoLogoModelS } from "react-icons/io";
import { PiSeatDuotone } from "react-icons/pi";
import { GiCarDoor } from "react-icons/gi";
import { TbManualGearboxFilled } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

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
  const { sm } = useBreakpoint();
  const { carId } = useParams();
  const { carDetails, isLoading } = useGetCarById(carId);
  return isLoading ? (
    <Spin spinning={isLoading} />
  ) : (
    !!carDetails && (
      <Row style={{ margin: "20px 100px" }} gutter={20} align="middle">
        <Col xs={10} sm={10} md={10} lg={10}>
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
        <Col xs={24} sm={24} md={24} lg={14}>
          <Image
            src={carDetails.imageURL}
            placeholder="Loading car image..."
            preview={toolBarRenderer}
            height={200}
          />
        </Col>
      </Row>
    )
  );
};

export default CarDetailsPage;
