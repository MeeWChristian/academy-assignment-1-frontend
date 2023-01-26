import create from 'zustand';

export type UserInfo = {
  id: string | null;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  avatar: string | null;
}

type UserDataStore = {
  user: UserInfo;
  updateUser: (newUser: UserInfo) => void;
};

export const useUserStore = create<UserDataStore>((set) => ({
  user: { id: null, username: null, first_name: null, last_name: null, avatar: null } as UserInfo,
  updateUser: (newUser: UserInfo) => set(() => ({ user: newUser })),
}));