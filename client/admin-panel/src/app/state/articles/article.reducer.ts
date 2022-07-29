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
  on(action.createArticleSuccess, (state, { article }) => ({
    ...state,
    articles: [...state.articles, article],
  })),
  on(action.createArticleFailed, (state, { error }) => ({ ...state, error })),
  on(action.getArticlesSuccess, (state, { articles }) => ({
    ...state,
    articles,
  })),
  on(action.getArticlesFailed, (state, { error }) => ({ ...state, error })),
  on(action.deleteArticleSuccess, (state, { slug }) => {
    const filteredArticles = cloneDeep(state.articles).filter(
      (value) => value.slug != slug
    );
    return { ...state, articles: filteredArticles };
  }),
  on(action.deleteArticleFailed, (state, { error }) => ({ ...state, error })),
  on(action.updateArticleSuccess, (state, { slug, article }) => {
    const filteredArticles = cloneDeep(state.articles).map((item) =>
      item.slug === slug ? article : item
    );
    return { ...state, articles: filteredArticles };
  }),
  on(action.updateArticleFailed, (state, { error }) => ({ ...state, error })),
  on(action.selectArticle, (state, { article }) => ({
    ...state,
    selectedArticle: article,
  })),
  on(action.resetArticle, (state) => ({ ...state, selectedArticle: null }))
);
