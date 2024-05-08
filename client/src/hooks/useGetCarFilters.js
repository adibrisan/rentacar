import { useEffect, useState, useMemo } from "react";
import api from "../utils/axiosInstance";
import useErrorHandlingStore from "../store/useErrorHandlingStore";

const initialCarFiltersData = {
  locations: [],
  seats: [],
  types: [],
};
const useGetCarFilters = () => {
  const [carFilters, setCarFilters] = useState(initialCarFiltersData);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsError } = useErrorHandlingStore();
  useEffect(() => {
    const getCarFilters = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/carFilters");
        if (response.status === 200) {
          setCarFilters(response.data);
          setIsLoading(false);
        } else {
          setIsError({
            isError: true,
            errorMesssage: "Error getting car filters.",
          });
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setIsError({
          isError: true,
          errorMesssage: `${err}`,
        });
      }
    };
    getCarFilters();
  }, []);

  const carFilterTreeData = useMemo(
    () => [
      {
        label: "Location",
        value: "location",
        children: carFilters.locations.map((filter) => ({
          label: filter,
          value: filter,
        })),
      },
      {
        label: "Seats",
        value: "seats",
        children: carFilters.seats.map((filter) => ({
          label: filter,
          value: filter,
        })),
      },
      {
        label: "Types",
        value: "type",
        children: carFilters.types.map((filter) => ({
          label: filter,
          value: filter,
        })),
      },
    ],
    [carFilters]
  );
  return { carFilterTreeData, isLoading };
};

export default useGetCarFilters;
