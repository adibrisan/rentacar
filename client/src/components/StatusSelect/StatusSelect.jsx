import { useState } from "react";
import { Select } from "antd";
import { ORDER_STATUS } from "../../utils/appConstants";

const StatusSelect = ({ value, rowData }) => {
  const [selectValue, setSelectValue] = useState(value);
  const options = Object.values(ORDER_STATUS).map((item) => ({
    value: item,
    label: item,
  }));
  const handleOnChangeStatus = (value) => {
    console.log(rowData);
    setSelectValue(value);
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
