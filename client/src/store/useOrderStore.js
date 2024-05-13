import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(
  persist((set) => ({
    orders: [],
    setOrders: (orders) => set({ orders }),
    deleteOrder: (_id) =>
      set((state) => ({
        orders: state.orders.filter((order) => order._id !== _id),
      })),
  })),
  {
    name: "orders",
  }
);

export default useOrderStore;
