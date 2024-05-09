import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import useErrorHandlingStore from "../store/useErrorHandlingStore";

const useGetCarById = (carId) => {
  const [carDetails, setCarDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsError } = useErrorHandlingStore();

  useEffect(() => {
    const getCar = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/car-details/${carId}`);
        console.log(res);
        if (res.status === 200) {
          setCarDetails(res.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsError({
            isError: true,
            errorMessage: "Error getting car details.",
          });
        }
      } catch (err) {
        setIsLoading(false);
        setIsError({
          isError: true,
          errorMessage: `${err}`,
        });
      }
    };
    getCar();
  }, []);
  return { carDetails, isLoading };
};

export default useGetCarById;
