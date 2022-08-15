import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ArticleFacade } from '@state/articles/article.facade';
import { Article } from '@state/articles/article.model';
import { Router } from '@angular/router';
import { UserFacade } from '@state/user/user.facade';
import { environment } from 'environments/environment';

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
  public fileSource: string;
  public imageUrl: string = environment.apiImageUrl;
  
  public pageIndex = 0;
  public searchTerm = '';
  public pageSize = 3;
  public pageSizeOptions: number[] = [3, 6, 9];

  constructor(
    private facade: ArticleFacade,
    public userFacade: UserFacade,
    public dialog: MatDialog,
    public router: Router
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
      searchTerm: this.searchTerm,
    });
  }

  public search(): void {
    this.facade.getArticles({
      limit: this.pageSize?.toString(),
      page: this.pageIndex?.toString(),
      searchTerm: this.searchTerm,
    });
  }

  public toArticle(slug: string): void {
    this.router.navigate([`article/${slug}`]);
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
    });
  }

  public logout(): void {
    this.userFacade.logout()
  }
}
