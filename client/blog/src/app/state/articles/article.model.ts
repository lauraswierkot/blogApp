import { User } from '@state/user/user.model';

export type StatePart<K extends keyof ArticleState> = Pick<ArticleState, K>;

export const articleFeatureKey = 'articles';
export type ArticleResponse = Record<'article', Article>;

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string | string[];
  createdAt: Date;
  updatedAt: Date;
  author: User;
  image: File;
  comments: Comment[];
}

export interface ArticleForm {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  file: File;
}

export interface GetArticlePayload {
  limit: string;
  page: string;
  searchTerm: string;
}

export interface GetArticlesCount {
  articles: Article[];
  total: number;
}

export interface ArticleState {
  articles: Article[];
  articlesCount: number;
  selectedArticle: Article;
  error: any;
}

export const initialState: ArticleState = {
  articles: [],
  articlesCount: 0,
  selectedArticle: null,
  error: null,
};
