import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("speako-theme") || "coffee",

  setTheme: (theme) => {
    localStorage.setItem("speako-theme", theme);
    set({ theme })
},
}));