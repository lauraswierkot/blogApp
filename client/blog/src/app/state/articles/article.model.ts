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

export interface Comment {
  id: number;
  slug: Article['slug'];
  createdAt: string | Date;
  updatedAt: string | Date;
  body: string;
  author: User;
  article: Article;
}

export interface UpdatedComment {
  slug: Article['slug'];
  body: string;
  id: number;
}

export interface CommentInterface {
  comment: Comment;
  slug: Article['slug'];
}

export interface ArticleState {
  articles: Article[];
  articlesCount: number;
  selectedArticleComments: Comment[];
  selectedArticle: Article;
  error: any;
}

export const initialState: ArticleState = {
  articles: [],
  articlesCount: 0,
  selectedArticleComments: [],
  selectedArticle: null,
  error: null,
};
