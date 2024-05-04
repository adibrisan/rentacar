import { create } from "zustand";

const useUserStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
}));

export default useUserStore;
