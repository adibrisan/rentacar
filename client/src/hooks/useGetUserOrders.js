import { useEffect } from "react";
import api from "../utils/axiosInstance";
import useUserStore from "../store/useUserStore";
import useOrderStore from "../store/useOrderStore";
import toast from "react-hot-toast";

const useGetUserOrders = () => {
  const { currentUser } = useUserStore();
  const { setOrders } = useOrderStore();

  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const response = await api.get(`/orders/${currentUser._id}`, {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          toast.error("Error getting user orders.");
        }
      } catch (err) {
        console.log(err);
        toast.error("Internal server error.");
      }
    };
    if (currentUser) {
      getUserOrders();
    }
  }, [currentUser]);
};

export default useGetUserOrders;
