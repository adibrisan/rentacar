import { useState, useEffect } from "react";
import useUserStore from "../store/useUserStore";
import useOrderStore from "../store/useOrderStore";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useGetAllOrders = () => {
  const { setAllOrders } = useOrderStore();
  const { currentUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/allOrders", {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          setAllOrders(res.data);
          setIsLoading(false);
        } else {
          toast.error("Error loading all orders for admin.");
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
        toast.error("Internal server error.");
      }
    };
    getAllOrders();
  }, [currentUser]);
  return { isLoading };
};

export default useGetAllOrders;
