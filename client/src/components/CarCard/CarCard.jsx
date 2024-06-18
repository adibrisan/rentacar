import { useNavigate } from "react-router-dom";
import { Card, Image, Radio, Row } from "antd";
import useUserStore from "../../store/useUserStore";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const { Meta } = Card;

const CarCard = ({ carDetails }) => {
  const navigate = useNavigate();
  const { currentUser } = useUserStore();

  const handleRadioChange = async (e) => {
    const isAvailable = e.target.value;
    try {
      const res = await api.put(
        `/car-details/${carDetails._id}`,
        { isAvailable },
        {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        toast.success("Successfully update car availability.");
      } else {
        toast.error("Error updating car availability.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating car availability.");
    }
  };

  return (
    <Card
      hoverable
      title={carDetails.brand}
      extra={
        <div style={{ color: "#1677FF", fontSize: "20px" }}>
          {carDetails.pricePerDay}&nbsp;&euro; / day
        </div>
      }
      style={{
        width: 340,
      }}
      cover={
        <Image
          src={carDetails.imageURL}
          placeholder="Loading car image..."
          preview={false}
          height={200}
        />
      }
      onClick={(e) => {
        if (!e.target.closest(".ant-radio-button-wrapper")) {
          navigate(`/car-details/${carDetails._id}`);
        }
      }}
    >
      <Meta
        title={carDetails.name}
        description="Rent this car at an unbelievable price"
      />
      {!!currentUser && currentUser.isAdmin ? (
        <Row justify="center" style={{ marginTop: "25px" }}>
          <Radio.Group
            style={{ zIndex: "10" }}
            defaultValue={carDetails.isAvailable}
            buttonStyle="solid"
            size="large"
            onChange={handleRadioChange}
          >
            <Radio.Button value={true}>Available</Radio.Button>
            <Radio.Button value={false}>Out Of Order</Radio.Button>
          </Radio.Group>
        </Row>
      ) : null}
    </Card>
  );
};

export default CarCard;
