import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { ArticleFacade } from '@state/articles/article.facade';
import { Article, GetArticlePayload } from '@state/articles/article.model';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  public articlesList$: Observable<Article[]>;
  public articlesCount$: Observable<number>;
  public articlesCount: number;
  public pageIndex = 0;
  public searchTerm: string;
  public pageSize = 3;
  public pageSizeOptions: number[] = [3, 6, 9];

  constructor(
    private facade: ArticleFacade,
    private router: Router,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.articlesCount$ = this.facade.articlesCount$;
    this.articlesList$ = this.facade.articles$;
    this.articlesCount$.pipe(untilDestroyed(this)).subscribe((total) => {
      this.articlesCount = total;
    });
    this.facade.getArticles({
      limit: this.pageSize?.toString(),
      page: this.pageIndex?.toString(),
      searchTerm: (this.searchTerm = ''),
    } as GetArticlePayload);
  }

  public search(): void {
    this.facade.getArticles({
      limit: this.pageSize?.toString(),
      page: this.pageIndex?.toString(),
      searchTerm: this.searchTerm,
    } as GetArticlePayload);
  }

  public createArticle(): void {
    this.router.navigate(['article']);
  }

  public deleteArticle(slug: string): void {
    this.facade.deleteArticle(slug);
  }

  public toUpdateArticle(slug: string): void {
    this.router.navigate([`article/${slug}`]);
  }

  public toAdminPanel(): void {
    this.router.navigate(['']);
  }

  public setPaginator(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateList();
  }

  public paginateList(): void {
    this.facade.getArticles({
      limit: this.pageSize?.toString(),
      page: this.pageIndex?.toString(),
      searchTerm: this.searchTerm,
    } as GetArticlePayload);
  }
}
