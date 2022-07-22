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
  on(action.createArticleSuccess, (state, { article }) => ({
    ...state,
    articles: [...state.articles, article],
  })),
  on(action.createArticleFailed, (state, { error }) => ({ ...state, error })),
  on(action.getArticlesSuccess, (state, { articles }) => ({
    ...state,
    articles: articles,
  })),
  on(action.getArticlesFailed, (state, { error }) => ({ ...state, error })),
  on(action.deleteArticleSuccess, (state, { slug }) => ({ ...state, articles: state.articles.filter(value => value.slug != slug) })),
  on(action.deleteArticleFailed, (state, { error }) => ({ ...state, error })),
  on(action.updateArticleSuccess, (state, { slug, article }) => ({...state,  articles: state.articles.map(x => (x.slug === slug ?  article  : x))})),
  on(action.updateArticleFailed, (state, { error }) => ({ ...state, error })),
  on(action.selectArticle, (state, { article }) => ({ ...state, selectedArticle: article })),
  on(action.resetArticle, (state) => ({ ...state, selectedArticle: null }))
);
