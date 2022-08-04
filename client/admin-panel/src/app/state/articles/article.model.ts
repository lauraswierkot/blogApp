import { ProfileResponse } from '@state/user/user.model';

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
  image: File;
  comments: Comment[];
}

export interface Comment {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  body: string;
  author: ProfileResponse;
  article: Article;
  image?: string;
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
  selectedArticleComments: Comment[];
  error: any;
}

export const initialState: ArticleState = {
  articles: [],
  selectedArticle: null,
  selectedArticleComments: [],
  error: null,
};
