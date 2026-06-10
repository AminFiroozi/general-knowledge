import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
	accessToken: string | undefined;
	refreshToken: string | undefined;
	_hasHydrated: boolean;
	setAccessToken: (token: string) => void;
	setRefreshToken: (token: string) => void;
	logout: () => void;
}

const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			accessToken: undefined,
			refreshToken: undefined,
			_hasHydrated: false,

			setAccessToken: (accessToken) => set((prev) => ({ ...prev, accessToken })),
			setRefreshToken: (refreshToken) => set((prev) => ({ ...prev, refreshToken })),
			logout: () =>
				set(() => ({
					accessToken: undefined,
					refreshToken: undefined,
				})),
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				if (state) state._hasHydrated = true;
			},
		},
	),
);

export default useUserStore;
