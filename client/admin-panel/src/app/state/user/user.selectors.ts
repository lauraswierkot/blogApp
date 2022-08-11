import { createFeatureSelector, createSelector } from '@ngrx/store';

import { userFeatureKey, UserState } from './user.model';

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const selectUserData = createSelector(
  selectUserState,
  (state) => state.user
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state) => state.selectedUser
);

export const selectUsersData = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUsersCount = createSelector(
  selectUserState,
  (state) => state.usersCount
);

export const selectToken = createSelector(
  selectUserState,
  (state) => state.token
);
