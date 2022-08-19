import { createFeatureSelector, createSelector } from '@ngrx/store';

import { articleFeatureKey, ArticleState } from './article.model';

export const selectArticleState =
  createFeatureSelector<ArticleState>(articleFeatureKey);

export const selectArticleData = createSelector(
  selectArticleState,
  (state) => state.articles
);

export const selectSelectedArticle = createSelector(
  selectArticleState,
  (state) => state.selectedArticle
);

export const selectArticlesCount = createSelector(
  selectArticleState,
  (state) => state.articlesCount
);
