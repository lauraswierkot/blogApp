import { createReducer, on } from '@ngrx/store';

import { initialState } from './article.model';
import * as action from './article.actions';

export const reducer = createReducer(
  initialState,
  on(action.createArticleSuccess, (state, { articleResponse }) => ({
    ...state,
    articleResponse,
  })),
  on(action.createArticleFail, (state, { error }) => ({ ...state, error }))
);
