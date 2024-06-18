import { useNavigate } from "react-router-dom";
import { Card, Image, Radio, Row } from "antd";
import useUserStore from "../../store/useUserStore";

const { Meta } = Card;

const CarCard = ({ carDetails }) => {
  const navigate = useNavigate();
  const { currentUser } = useUserStore();

  const handleRadioChange = (e) => {};

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
            defaultValue={true}
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
