export type StatePart<K extends keyof UserState> = Pick<UserState, K>;

export const userFeatureKey = 'user';

export interface User {
  email: string;
  username?: string;
  bio: string;
  image: string | null;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserState {
  user: User | null;
}
export const initialState: UserState = {
  user: null,
};
