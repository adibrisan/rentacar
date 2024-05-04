import { create } from "zustand";

const useErrorHandlingStore = create((set) => ({
  isError: { isError: false, errorMessage: "" },
  setIsError: (isError) => set({ isError }),
}));

export default useErrorHandlingStore;
