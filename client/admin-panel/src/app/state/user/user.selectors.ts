import { createFeatureSelector, createSelector } from '@ngrx/store';

import { userFeatureKey, UserState } from './user.model';

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const selectUserData = createSelector(
  selectUserState,
  (state) => state.user
); 

export const selectToken = createSelector(
  selectUserState,
  (state) => state.token
);
