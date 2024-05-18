import { Row, Col, Flex, Typography, Spin } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { AgGridReact } from "ag-grid-react";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";

import { statusRenderer } from "../../utils/helper";
import useGetAllOrders from "../../hooks/useGetAllOrders";
import StatusSelect from "../../components/StatusSelect/StatusSelect";
import useOrderStore from "../../store/useOrderStore";

const { Title } = Typography;

const AdminPage = () => {
  const { allOrders } = useOrderStore();
  const { isLoading } = useGetAllOrders();
  const columnDefs = [
    {
      headerName: "Car brand",
      field: "car.brand",
      filter: true,
    },
    { headerName: "Car Type", field: "car.type", filter: true },
    { headerName: "Rent period", field: "rentPeriod", filter: true },
    { headerName: "Order number", field: "orderNumber", filter: true },
    {
      headerName: "Total Price",
      field: "rentalPrice",
      cellRenderer: (params) => <span>{params.value}&nbsp;&euro;</span>,
      filter: true,
    },
    {
      headerName: "Status",
      field: "orderStatus",
      cellRenderer: (params) => (
        <StatusSelect rowData={params.data} value={params.value} />
      ),
      cellStyle: (params) => {
        return { backgroundColor: statusRenderer(params.value) };
      },
      filter: true,
    },
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
          <UnorderedListOutlined size={40} color="gray" />
        </Flex>
      </Col>
      <Col span={24}>
        <Spin spinning={isLoading}>
          <div
            className="ag-theme-quartz"
            style={{ height: "600px", width: "100%" }}
          >
            <AgGridReact
              columnDefs={columnDefs}
              rowData={allOrders}
              onGridReady={onGridReady}
              pagination={true}
              columnMenu="legacy"
              gridOptions={gridOptions}
              onToolPanelVisibleChanged={(params) =>
                params.api.sizeColumnsToFit()
              }
            />
          </div>
        </Spin>
      </Col>
    </Row>
  );
};

export default AdminPage;
