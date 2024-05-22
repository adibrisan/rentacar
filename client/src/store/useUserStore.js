import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useUserStore = create(
  devtools((set) => ({
    currentUser: null,
    setCurrentUser: (currentUser) =>
      set({ currentUser }, false, "setCurrentUser"),
    isLoadingUserData: true,
    setIsLoadingUserData: (isLoadingUserData) =>
      set({ isLoadingUserData }, false, "setIsLoadingUserData"),
  }))
);

export default useUserStore;
