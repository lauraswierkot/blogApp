import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
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
import { articleReducer } from  'src/app/state/articles/article.reducer'

import { UserEffects } from './user/user.effects';
import { ArticleEffects } from './articles/article.effects';
import { userFeatureKey } from './user/user.model';
import { articleFeatureKey } from './articles/article.model';

const effects = [UserEffects, ArticleEffects];

const reducers: ActionReducerMap<any> = {
  users: userReducer,
  articles: articleReducer
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [userFeatureKey, articleFeatureKey],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
})
export class StateModule {}
