import { TUser } from "@/types/users";
import { create } from "zustand";
import { createSelectors } from "./utils/createSelectors";

interface IUserStore {
  user: TUser | undefined;
  setUser: (user?: TUser) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: void null,
  setUser: (user) => set({ user }),
}));

export const useUserSelectors = createSelectors(useUserStore);

export default useUserStore;
