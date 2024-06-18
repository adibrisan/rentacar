import { useEffect, useState } from "react";
import useCarMultiFilter from "../store/useCarMultiFilter";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useGetCarList = (currentPage, pageSize) => {
  const [totalCars, setTotalCars] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [carList, setCarList] = useState([]);
  const { multiCarFilter } = useCarMultiFilter();
  const pagination = {
    currentPage,
    pageSize,
  };
  useEffect(() => {
    const getCars = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/cars", {
          data: { multiCarFilter, pagination },
        });
        if (res.status === 200) {
          setCarList(res.data[0]);
          setTotalCars(res.data[1]);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error("Error retrieving cars data.");
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
        toast.error("Error retrieving cars data.");
      }
    };
    getCars();
  }, [multiCarFilter, pagination.currentPage, pagination.pageSize]);
  return { carList, totalCars, isLoading };
};

export default useGetCarList;
