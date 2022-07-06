export type StatePart<K extends keyof UserState> = Pick<UserState, K>;

export const userFeatureKey = 'user';

export interface User {
  email: string;
  username: string;
  bio: string;
  image?: string;
  token: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserState {
  user: Omit<User, 'token'>;
  error: any;
  token: User['token'];
}

export const initialState: UserState = {
  user: null,
  error: null,
  token: null,
};
