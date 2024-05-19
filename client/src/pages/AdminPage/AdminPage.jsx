import { useMemo } from "react";
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
import api from "../../utils/axiosInstance";
import useUserStore from "../../store/useUserStore";
import toast from "react-hot-toast";

const { Title } = Typography;

const AdminPage = () => {
  const { currentUser } = useUserStore();
  const { allOrders } = useOrderStore();
  const { isLoading } = useGetAllOrders();
  const columnDefs = [
    {
      headerName: "Car brand",
      field: "car.brand",
      cellRenderer: "agGroupCellRenderer",
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

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: "NAME", headerName: "Name" },
          { field: "SURNAME", headerName: "Surname" },
          { field: "email", headerName: "Email" },
          { field: "phone", headerName: "Phone" },
          { field: "CATEGORY", headerName: "License Category" },
        ],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: async (params) => {
        try {
          const userId = params.data.userId;
          const response = await api.get(`/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            const userDetails = response.data;
            params.data.userDetails = [userDetails];
            params.successCallback(params.data.userDetails);
          } else {
            toast.error("Error retrieving user details.");
          }
        } catch (err) {
          console.log(err);
          toast.error("Error retrieving user details.");
        }
      },
    };
  }, []);

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
              onFirstDataRendered={onFirstDataRendered}
              pagination={true}
              columnMenu="legacy"
              gridOptions={gridOptions}
              masterDetail={true}
              detailCellRendererParams={detailCellRendererParams}
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
