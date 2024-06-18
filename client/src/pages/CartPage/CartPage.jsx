import { Row, Col, Typography, Flex } from "antd";
import { BsCart3 } from "react-icons/bs";
import { AgGridReact } from "ag-grid-react";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import useOrderStore from "../../store/useOrderStore";
import { statusRenderer } from "../../utils/helper";
import { DeleteOutlined } from "@ant-design/icons";
import api from "../../utils/axiosInstance";
import useErrorHandlingStore from "../../store/useErrorHandlingStore";
import useUserStore from "../../store/useUserStore";
import styles from "./CartPage.module.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import toast from "react-hot-toast";

const { Title } = Typography;
const CartPage = () => {
  const { currentUser } = useUserStore();
  const { orders, setOrders } = useOrderStore();
  const { setIsError } = useErrorHandlingStore();
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
      cellStyle: (params) => {
        return { backgroundColor: statusRenderer(params.value) };
      },
      filter: true,
    },
    {
      headerName: "Delete Order Action",
      cellRenderer: (params) => (
        <DeleteOutlined
          className={styles.deleteOrder}
          size={20}
          onClick={handleDeleteOrder(params)}
        />
      ),
    },
  ];

  const handleDeleteOrder = (params) => async () => {
    console.log("params", params.data._id);
    try {
      const res = await api.delete(`/deleteOrder/${params.data._id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
      console.log("res", res);
      if (res.status === 204) {
        setOrders(orders.filter((order) => order._id !== params.data._id));
        toast.success("Successfully deleted order !");
      } else {
        setIsError({ isError: true, errorMessage: "Error deleting order." });
      }
    } catch (err) {
      console.log(err);
      setIsError({ isError: true, errorMessage: "Internal server error." });
    }
  };

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
    console.log(params.api.getRenderedNodes());
  };
  const gridOptions = {
    sideBar: true,
    modules: [FiltersToolPanelModule],
  };
  const onFirstDataRendered = (params) => {
    const defaultFilterModel = {
      orderStatus: {
        filterType: "set",
        values: ["PENDING"],
      },
    };

    console.log("Applying default filter model:", defaultFilterModel);

    params.api.setFilterModel(defaultFilterModel);

    const appliedFilterModel = params.api.getFilterModel();
    console.log("Applied filter model:", appliedFilterModel);

    params.api.onFilterChanged();
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
          style={{ height: "65vh", width: "100%" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={orders}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
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
