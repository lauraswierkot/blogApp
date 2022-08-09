import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { ArticleFacade } from '@state/articles/article.facade';
import { Article } from '@state/articles/article.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  public articlesList: Observable<Article[]>;
  public searchTerm: string;

  constructor(
    private facade: ArticleFacade,
    private router: Router,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.articlesList = this.facade.articles$;
    this.facade.getArticles();
  }

  public search(): void {
    this.facade.getArticles(this.searchTerm);
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
}
