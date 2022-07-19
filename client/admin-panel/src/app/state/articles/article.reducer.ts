import { Action, createReducer, on } from '@ngrx/store';

import { ArticleState, initialState } from './article.model';
import * as action from './article.actions';

export function articleReducer(
  state: ArticleState = initialState,
  action: Action
): ArticleState {
  return reducer(state, action);
}

export const reducer = createReducer(
  initialState,
  on(action.createArticleSuccess, (state, { articleResponse }) => ({
    ...state,
   articles: [...state.articles, articleResponse]
  })),
  on(action.createArticleFailed, (state, { error }) => ({ ...state, error })),
  on(action.getArticlesSuccess, (state, { articles }) => ({
    ...state,
    articles,
  })),
  on(action.getArticlesFailed, (state, { error }) => ({ ...state, error }))
);
