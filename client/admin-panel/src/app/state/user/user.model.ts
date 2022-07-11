export type StatePart<K extends keyof UserState> = Pick<UserState, K>;

export const userFeatureKey = 'users';
export type UserResponse = Record<'user', User>;

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: number;
  username: string;
  bio?: string;
  image?: string;
  token: string;
}

export interface Error {
  error: {
    error: any;
    statusCode: string;
  } 
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  username: string;
  email: string;
  password: string;
  age: number;
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
