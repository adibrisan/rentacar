import { Row, Col, Typography, Flex } from "antd";
import { BsCart3 } from "react-icons/bs";
import { AgGridReact } from "ag-grid-react";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import useOrderStore from "../../store/useOrderStore";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";

const { Title } = Typography;
const CartPage = () => {
  const { orders } = useOrderStore();
  console.log(orders);
  const columnDefs = [
    {
      headerName: "Car brand",
      field: "car.brand",
      filter: true,
    },
    { headerName: "Car Type", field: "car.type", filter: true },
    { headerName: "Rent period", field: "rentPeriod", filter: true },
    { headerName: "Order number", field: "orderNumber", filter: true },
    { headerName: "Total Price", field: "rentalPrice", filter: true },
    { headerName: "Status", field: "orderStatus", filter: true },
  ];

  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ];
  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
    console.log(params.api.getRenderedNodes());
  };
  const gridOptions = {
    sideBar: true,
    modules: [FiltersToolPanelModule],
  };
  return (
    <Row style={{ margin: "30px 30px" }}>
      <Col span={24}>
        <Flex align="center" gap={20}>
          <Title style={{ color: "#1677FF" }}>Your cart</Title>
          <BsCart3 size={40} color="gray" />
        </Flex>
      </Col>
      <Col span={24}>
        <div
          className="ag-theme-quartz"
          style={{ height: "600px", width: "100%" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={orders}
            onGridReady={onGridReady}
            pagination={true}
            columnMenu="legacy"
            gridOptions={gridOptions}
            onToolPanelVisibleChanged={(params) =>
              params.api.sizeColumnsToFit()
            }
          />
        </div>
      </Col>
    </Row>
  );
};

export default CartPage;
