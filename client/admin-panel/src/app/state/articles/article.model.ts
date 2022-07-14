import { ProfileResponse } from '../user/user.model';

export type StatePart<K extends keyof ArticleState> = Pick<ArticleState, K>;

export const articleFeatureKey = 'articles';
export type ArticleResponse = Record<'article', Article>;

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  author: ProfileResponse;
}

export interface ArticleState {
  articles: Article[];
  error: any;
}

export const initialState: ArticleState = {
  articles: null,
  error: null,
};

export interface ArticleForm {
  title: string;
  body: string;
  image: string;
  description: string;
  tagList: string;
}
