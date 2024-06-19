import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";
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
  Tag,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import moment from "moment";
import useGetCarById from "../../hooks/useGetCarById";
import { IoLogoModelS } from "react-icons/io";
import { PiSeatDuotone } from "react-icons/pi";
import { GiCarDoor } from "react-icons/gi";
import { TbManualGearboxFilled } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import {
  DATE_FORMAT,
  DAYS_IN_A_WEEK,
  ORDER_STATUS,
} from "../../utils/appConstants";
import useUserStore from "../../store/useUserStore";
// import useOrderStore from "../../store/useOrderStore";
import styles from "./CarDetailsPage.module.css";

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
  const [isPopVisible, setIsPopVisible] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useUserStore();
  const [rentPeriod, setRentPeriod] = useState(["", ""]);
  const [orderNumber, setOrderNumber] = useState(1);
  const [isInvalid, setIsInvalid] = useState(false);
  const { sm } = useBreakpoint();
  const { carId } = useParams();
  const { carDetails, isLoading } = useGetCarById(carId);
  console.log(carDetails);
  const [rentalPrice, setRentalPrice] = useState(0);
  const orderDetails = {
    car: carDetails,
    rentPeriod,
    orderNumber,
    userId: currentUser?._id,
    rentalPrice: orderNumber * rentalPrice,
    orderStatus: ORDER_STATUS.PENDING,
  };

  useEffect(() => {
    if (rentPeriod[0] && rentPeriod[1]) {
      setIsInvalid(false);
    }
  }, [rentPeriod]);

  const handleMakeCarOrder = async () => {
    if (!rentPeriod[0] && !rentPeriod[1]) {
      setIsInvalid(true);
    }
    if (!currentUser?.hasProfile) {
      toast.error("Please login and update your profile !");
    }
    try {
      if (currentUser.hasProfile && rentPeriod[0] && rentPeriod[1]) {
        await api.post("/newOrder", orderDetails, {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        toast.success("Succesfully made order !");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Internal server error.");
    }
  };

  const handleOnChangePeriod = (_date, dateString) => {
    setRentPeriod(dateString);
    if (!dateString || dateString.length !== 2) {
      setRentalPrice(0);
      return;
    }

    const startDate = moment(dateString[0], "DD.MM.YYYY");
    const endDate = moment(dateString[1], "DD.MM.YYYY");
    const duration = endDate.diff(startDate, "days");

    if (duration === DAYS_IN_A_WEEK) {
      setRentalPrice(carDetails.pricePerWeek);
    } else if (duration < DAYS_IN_A_WEEK) {
      setRentalPrice(duration * carDetails.pricePerDay);
    } else {
      const weeks = Math.floor(duration / DAYS_IN_A_WEEK);
      const remainingDays = duration % DAYS_IN_A_WEEK;
      const totalPrice =
        weeks * carDetails.pricePerWeek +
        remainingDays * carDetails.pricePerDay;
      setRentalPrice(totalPrice);
    }
  };

  const confirm = async (e) => {
    try {
      const res = await api.delete(`/car-details/deleteCar/${carId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 204) {
        toast.success("Deleted the car.");
        setIsPopVisible(false);
        navigate("/");
      } else {
        toast.error("Car not found.");
        setIsPopVisible(false);
      }
    } catch (err) {
      setIsPopVisible(false);
      toast.error(`${err}`);
    }
  };
  const cancel = (e) => {
    message.info("Cancelled action to delete car !");
    setIsPopVisible(false);
  };
  const buttonStyle = {
    fontSize: "16px",
  };
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
            <Title level={!sm ? 3 : 5} style={{ color: "gray" }}>
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
                Price per day:
              </label>
              <Tag style={{ fontSize: "20px" }} color="red-inverse">
                {carDetails.pricePerDay} &euro;
              </Tag>
            </Flex>
            <Flex align="center" gap={20}>
              <label className={styles.periodLabel} htmlFor="rangePicker">
                Price per week:
              </label>
              <Tag style={{ fontSize: "20px" }} color="green-inverse">
                {carDetails.pricePerWeek} &euro;
              </Tag>
            </Flex>
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
                  onChange={handleOnChangePeriod}
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
              <Tooltip visible={!carDetails?.isAvailable} title="Out of Order">
                <Button
                  type="primary"
                  size="large"
                  onClick={handleMakeCarOrder}
                  disabled={!carDetails?.isAvailable}
                >
                  I want this car
                </Button>
              </Tooltip>
            </Flex>
          </Col>
        </Row>
        {currentUser?.isAdmin ? (
          <Row>
            <Popconfirm
              visible={isPopVisible}
              okButtonProps={{ style: buttonStyle }}
              cancelButtonProps={{ style: buttonStyle }}
              title={
                <div
                  style={{
                    padding: "20px",
                    fontSize: "16px",
                    width: "300px",
                    height: "auto",
                  }}
                >
                  Delete the task
                </div>
              }
              description="Are you sure to delete this car?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{ marginLeft: "60px", marginTop: "50px" }}
                size="large"
                danger
                onClick={() => setIsPopVisible(true)}
              >
                Delete this car
              </Button>
            </Popconfirm>
          </Row>
        ) : null}
      </Row>
    )
  );
};

export default CarDetailsPage;
