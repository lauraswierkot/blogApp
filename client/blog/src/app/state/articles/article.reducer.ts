import { Action, createReducer, on } from '@ngrx/store';

import { ArticleState, initialState } from './article.model';
import * as action from './article.actions';
import * as cloneDeep from 'lodash/cloneDeep';

export function articleReducer(
  state: ArticleState = initialState,
  action: Action
): ArticleState {
  return reducer(state, action);
}

export const reducer = createReducer(
  initialState,
  on(action.getArticlesSuccess, (state, { articles }) => ({
    ...state,
    articles,
  })),
  on(action.getArticlesFailed, (state, { error }) => ({ ...state, error })),
  on(action.selectArticleSuccess, (state, { article }) => ({
    ...state,
    selectedArticle: article,
  })),
  on(action.resetArticle, (state) => ({ ...state, selectedArticle: null })),
  on(action.setArticlesCount, (state, { articlesCount }) => ({
    ...state,
    articlesCount: articlesCount,
  }))
);
