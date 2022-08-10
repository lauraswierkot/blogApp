import { Error } from '@state/notifications/notification.model';

export type StatePart<K extends keyof UserState> = Pick<UserState, K>;

export const userFeatureKey = 'users';
export type UserResponse = Record<'user', User>;
export type UserData = Omit<User, 'token'>;

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: number;
  username: string;
  bio?: string;
  age: string;
  image?: string;
  token: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  username: string;
  age: string;
  role: Role;
}

export interface ProfileResponse extends UserResponse {
  following: boolean;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export interface GetUserPayload {
  limit: string;
  page: string;
  searchTerm: string;
}

export interface GetUsersCount {
  users: User[];
  total: number;
}

export interface UserState {
  users: User[];
  user: UserData;
  usersCount: number;
  selectedUser: User;
  token: User['token'];
  error: Error;
}

export const initialState: UserState = {
  users: [],
  user: null,
  usersCount: null,
  selectedUser: null,
  token: null,
  error: null,
};
