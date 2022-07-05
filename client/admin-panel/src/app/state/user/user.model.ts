import { FormControl } from '@angular/forms';
import { UserState } from './user.state';

export type StatePart<K extends keyof UserState> = Pick<UserState, K>;

export interface Login {
  email: string;
  password: string;
}

export interface AuthResponse {
  email: string;
  username: string;
  bio: string;
  image: string | null;
  token: string;
}
