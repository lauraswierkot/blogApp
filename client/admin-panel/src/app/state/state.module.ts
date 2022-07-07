import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';

import { environment } from 'src/environments/environment';
import { userReducer } from 'src/app/state/user/user.reducer';
import { State } from './state';

import merge from 'lodash.merge';

const reducers: ActionReducerMap<State> = {
  users: userReducer,
};
const mergeReducer = (state: State, rehydratedState: State, action: Action) => {
  state = merge(state, rehydratedState);
  return state;
};

export function localStorageSyncReducer(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return localStorageSync({
    keys: ['users'],
    rehydrate: true,
    mergeReducer,
  })(reducer);
}
export const metaReducers: Array<MetaReducer<State, any>> = [
  localStorageSyncReducer,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
})
export class StateModule {}
