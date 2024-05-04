import { useEffect } from "react";
import api from "../utils/axiosInstance";
import useUserStore from "../store/useUserStore";

const usePersistUser = () => {
  const { setCurrentUser } = useUserStore();
  useEffect(() => {
    const handleRefreshToken = async () => {
      try {
        const response = await api.post("/refresh-token");
        if (response.statusText === "OK") {
          console.log(response.data);
          setCurrentUser(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleRefreshToken();
  }, []);
};

export default usePersistUser;
