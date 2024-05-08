import { create } from "zustand";

const useCarMultiFilter = create((set) => ({
  rentPeriod: ["", ""],
  setRentPeriod: (rentPeriod) => set({ rentPeriod }),
}));

export default useCarMultiFilter;
