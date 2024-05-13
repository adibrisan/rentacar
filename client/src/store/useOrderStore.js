import { create } from "zustand";

const useOrderStore = create((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
  deleteOrder: (_id) =>
    set((state) => ({
      orders: state.orders.filter((order) => order._id !== _id),
    })),
}));

export default useOrderStore;
