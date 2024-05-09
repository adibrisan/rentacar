import { useEffect } from "react";
import api from "../utils/axiosInstance";
import useUserStore from "../store/useUserStore";

const usePersistUser = () => {
  const { setCurrentUser, setIsLoadingUserData } = useUserStore();
  useEffect(() => {
    const handleRefreshToken = async () => {
      try {
        setIsLoadingUserData(true);
        const response = await api.post("/refresh-token");
        if (response.statusText === "OK") {
          console.log("persisted", response.data);
          setCurrentUser(response.data);
        }
        setIsLoadingUserData(false);
      } catch (err) {
        console.log(err);
        setIsLoadingUserData(false);
      }
    };
    handleRefreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default usePersistUser;
