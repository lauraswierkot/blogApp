import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as action from './article.actions';
import { Article, GetArticlePayload } from './article.model';
import * as selector from './article.selectors';

@Injectable({
  providedIn: 'root',
})
export class ArticleFacade {
  public articles$ = this.store.select(selector.selectArticleData);
  public articlesCount$ = this.store.select(selector.selectArticlesCount);
  public selectedArticle$ = this.store.select(selector.selectSelectedArticle);

  constructor(private store: Store) {}

  public getArticles(payload: GetArticlePayload): void {
    this.store.dispatch(action.getArticles({ payload }));
  }

  public selectArticle(slug: Article['slug']): void {
    this.store.dispatch(action.selectArticle({ slug }));
  }

  public resetArticle(): void {
    this.store.dispatch(action.resetArticle());
  }

  public createComment(slug: string, body: string): void {
    this.store.dispatch(action.createComment({ slug, body }));
  }
 
  public updateComment(updateComment: UpdatedComment): void {
    this.store.dispatch(action.updateComment({ slug: updateComment.slug, body: updateComment.body, id: updateComment.id }));
  }

  public deleteComment(slug: Article['slug'], id: Comment['id']): void {
    this.store.dispatch(action.deleteComment({ slug, id }));
  }
}
