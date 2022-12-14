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

export interface UpdateUser {
  email?: string;
  image?: string;
  bio?: string;
  password: string;
}

export interface AuthResponse extends User {
  confirmToken?: string;
  token: string;
  reminderToken?: string;
}

export interface ProfileResponse extends UserResponse {
  following: boolean | null;
}

export enum TokenType {
  Confirm = 'confirmToken',
  Reminder = 'reminderToken',
}

export interface UserState {
  user: UserData;
  error: Error;
  token: User['token'];
}

export const initialState: UserState = {
  user: null,
  error: null,
  token: null,
};
