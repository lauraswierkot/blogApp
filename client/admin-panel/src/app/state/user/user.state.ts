import { AuthResponse } from './user.model';

export const userFeatureKey = 'user';

export const initialState: UserState = {
  user: null,
};

export interface UserState {
  user: AuthResponse | null;
}
