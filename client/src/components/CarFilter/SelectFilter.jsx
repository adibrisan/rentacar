import { Select } from "antd";
import useCarMultiFilter from "../../store/useCarMultiFilter";

const SelectFilter = ({ label, values }) => {
  const { setMultiCarFilter, multiCarFilter } = useCarMultiFilter();
  const options = values.map((item) => ({
    value: item,
    label: item,
  }));
  const handleOnChange = (value) => {
    const filter = {
      label,
      value,
    };
    setMultiCarFilter(filter);
  };
  return (
    <Select
      onChange={handleOnChange}
      placeholder={`Select ${label} filter`}
      options={options}
      size="large"
      style={{ width: "250px" }}
      mode="multiple"
      allowClear
    />
  );
};

export default SelectFilter;
