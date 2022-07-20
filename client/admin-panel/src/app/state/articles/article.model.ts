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
}

export interface ArticleState {
  articles: Article[];
  error: any;
}

export const initialState: ArticleState = {
  articles: [],
  error: null,
};

export interface ArticleForm {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  file: File;
}

export interface Error {
  error: {
    error: string | string[];
    statusCode: string;
  };
}
