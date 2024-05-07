import { Card, Image, Space } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";

const { Meta } = Card;

const CarCard = () => {
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
      style={{
        width: 340,
      }}
      cover={
        <Image
          src="https://www.discovercars.com/images/car/8343/200.png"
          placeholder="Loading..."
          preview={toolBarRenderer}
        />
      }
    >
      <Meta title="Polo" description="Rent this car at an unbelievable price" />
    </Card>
  );
};

export default CarCard;
