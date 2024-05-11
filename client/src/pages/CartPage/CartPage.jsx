import { Row, Col, Typography, Flex } from "antd";
import { BsCart3 } from "react-icons/bs";
import { AgGridReact } from "ag-grid-react";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";

const { Title } = Typography;
const CartPage = () => {
  const columnDefs = [
    {
      headerName: "Make",
      field: "make",
      filter: true,
    },
    { headerName: "Model", field: "model", filter: true },
    { headerName: "Price", field: "price", filter: true },
  ];

  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ];
  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
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
            rowData={rowData}
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
