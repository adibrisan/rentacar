import { useNavigate } from "react-router-dom";
import { Card, Image } from "antd";

const { Meta } = Card;

const CarCard = ({ carDetails }) => {
  const navigate = useNavigate();

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
      onClick={() => navigate(`/car-details/${carDetails._id}`)}
    >
      <Meta
        title={carDetails.name}
        description="Rent this car at an unbelievable price"
      />
    </Card>
  );
};

export default CarCard;
