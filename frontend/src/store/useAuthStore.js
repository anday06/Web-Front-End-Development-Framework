import { create } from "zustand";
import api from "../api/axios";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("auth")) || null,
  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("auth", JSON.stringify(res.data));
    set({ user: res.data });
  },
  register: async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("auth", JSON.stringify(res.data));
    set({ user: res.data });
  },
  logout: () => {
    localStorage.removeItem("auth");
    set({ user: null });
  },
}));

export default useAuthStore;
