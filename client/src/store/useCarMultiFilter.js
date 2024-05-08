import { create } from "zustand";

const setMultiCarFilter = (set) => (filter) => {
  set((state) => {
    return {
      multiCarFilter: {
        ...state.multiCarFilter,
        [filter.label]: filter.value,
      },
    };
  });
};

const useCarMultiFilter = create((set) => ({
  rentPeriod: ["", ""],
  setRentPeriod: (rentPeriod) => set({ rentPeriod }),
  multiCarFilter: {
    location: [],
    type: [],
    seats: [],
  },
  setMultiCarFilter: setMultiCarFilter(set),
}));

export default useCarMultiFilter;
