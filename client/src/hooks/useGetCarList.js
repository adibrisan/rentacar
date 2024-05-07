import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useGetCarList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    const getCars = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/cars");
        if (res.status === 200) {
          setCarList(res.data);
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
  }, []);
  return { carList, isLoading };
};

export default useGetCarList;
