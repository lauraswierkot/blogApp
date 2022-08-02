import { Error } from '@state/notifications/notification.model';

export type StatePart<K extends keyof ArticleState> = Pick<ArticleState, K>;

export const articleFeatureKey = 'articles';
export type ArticleResponse = Record<'article', Article>;

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  author: string;
  image: string;
  blob: string;
}

export interface ArticleForm {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  file: File;
}

export interface ArticleState {
  articles: Article[];
  selectedArticle: Article;
  error: Error;
}

export const initialState: ArticleState = {
  articles: [],
  selectedArticle: null,
  error: null,
};
