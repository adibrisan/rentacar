import { useState } from "react";
import { Select } from "antd";
import { ORDER_STATUS } from "../../utils/appConstants";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import useErrorHandlingStore from "../../store/useErrorHandlingStore";
import useUserStore from "../../store/useUserStore";
import useOrderStore from "../../store/useOrderStore";

const StatusSelect = ({ value, rowData }) => {
  const { allOrders, setAllOrders } = useOrderStore();
  const { currentUser } = useUserStore();
  const { setIsError } = useErrorHandlingStore();
  const [selectValue, setSelectValue] = useState(value);
  const options = Object.values(ORDER_STATUS).map((item) => ({
    value: item,
    label: item,
  }));
  const handleOnChangeStatus = async (value) => {
    setSelectValue(value);
    setAllOrders(
      allOrders.map((order) => {
        if (order._id === rowData._id) {
          order.orderStatus = value;
        }
        return order;
      })
    );
    try {
      const res = await api.put(
        `/updateOrder/${rowData._id}`,
        { orderStatus: value },
        {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        toast.success("Successfully update order status.");
      } else {
        toast.error("Error updating order status.");
      }
    } catch (err) {
      console.log(err);
      setIsError({ isError: true, errorMessage: "Internal Server Error." });
    }
  };
  return (
    <Select
      value={selectValue}
      style={{ width: 120 }}
      onChange={handleOnChangeStatus}
      options={options}
    />
  );
};

export default StatusSelect;
