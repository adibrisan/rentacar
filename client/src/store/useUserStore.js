import { create } from "zustand";

const useUserStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
  isLoadingUserData: true,
  setIsLoadingUserData: (isLoadingUserData) => set({ isLoadingUserData }),
}));

export default useUserStore;
