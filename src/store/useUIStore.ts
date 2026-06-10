import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
	theme: "light" | "dark" | "system";
	sidebarOpen: boolean;
	setTheme: (theme: "light" | "dark" | "system") => void;
	setSidebarOpen: (open: boolean) => void;
	toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
	persist(
		(set) => ({
			theme: "system",
			sidebarOpen: false,
			setTheme: (theme) => set({ theme }),
			setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
			toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
		}),
		{
			name: "ui-storage",
		},
	),
);
