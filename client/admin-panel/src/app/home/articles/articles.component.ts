import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { ArticleFacade } from '@state/articles/article.facade';
import { Article } from '@state/articles/article.model';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  public articlesList: Observable<Article[]>;
  public articleForm: FormData; 
  
  constructor(private facade: ArticleFacade, private router: Router) {}

  public ngOnInit(): void {
    this.articlesList = this.facade.articles$;
    this.facade.getArticles();
  }

  public createArticle(): void {
    this.router.navigate(['article']);
  }

  public deleteArticle(slug: string): void {
    this.facade.deleteArticle(slug);
  }

  public toUpdateArticle(): void {
    this.router.navigate(['update-article']);
  }
 
}