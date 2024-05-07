import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useGetCarList = () => {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    const getCars = async () => {
      try {
        const res = await api.get("/cars");
        if (res.status === 200) {
          setCarList(res.data);
        } else {
          toast.error("Error retrieving cars data.");
        }
      } catch (err) {
        console.log(err);
        toast.error("Error retrieving cars data.");
      }
    };
    getCars();
  }, []);
  return carList;
};

export default useGetCarList;
