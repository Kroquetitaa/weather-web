type StorageActions = {
  login: (email: string) => void;
  logout: () => void;
};

type AuthState = {
  email: string | null;
  isAuthenticated: boolean;
};

export type AuthStore = StorageActions & AuthState;
