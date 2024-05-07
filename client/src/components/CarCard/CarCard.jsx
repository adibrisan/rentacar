import { Card, Image, Space } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";

const { Meta } = Card;

const CarCard = ({ carDetails }) => {
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
          placeholder="Loading..."
          preview={toolBarRenderer}
          height={200}
        />
      }
    >
      <Meta
        title={carDetails.name}
        description="Rent this car at an unbelievable price"
      />
    </Card>
  );
};

export default CarCard;
