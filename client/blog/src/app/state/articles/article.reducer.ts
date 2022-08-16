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
  })),
  on(action.createCommentSuccess, (state, { comment }) => {
    const comments =
    !state.selectedArticle?.comments
        ? []
        : state.selectedArticle.comments;
    return {
      ...state,
      selectedArticle: {
        ...state.selectedArticle,
        comments: [...comments, comment],
      },
      comments: [...comments, comment],
    };
  }),
  on(action.createCommentFailed, (state, { error }) => ({ ...state, error })),
  on(action.updateCommentSuccess, (state, { id, body }) => {
    const filteredComments = cloneDeep(state.selectedArticleComments).map(
      (item) => (item.id === id ? { ...item, body: body } : item)
    );
 
    return {
      ...state,
      selectedArticleComments: filteredComments,
      selectedArticle: { ...state.selectedArticle, comments: filteredComments },
    };
  }),
  on(action.updateCommentFailed, (state, { error }) => ({ ...state, error })),

  on(action.deleteCommentSuccess, (state, { id }) => {
    const filteredComments = cloneDeep(state.selectedArticle.comments).filter(
      (value) => value.id != id
    );
    return {
      ...state,
      selectedArticle: { ...state.selectedArticle, comments: filteredComments },
    };
  }),
  on(action.deleteCommentFailed, (state, { error }) => ({ ...state, error }))
);
