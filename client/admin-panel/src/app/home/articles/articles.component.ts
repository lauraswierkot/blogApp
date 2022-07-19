import { Component, OnInit } from '@angular/core';
import { ArticleFacade } from 'src/app/state/articles/article.facade';
import { Article, ArticleResponse } from 'src/app/state/articles/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public articlesList: ArticleResponse[] = [];

  constructor(private facade: ArticleFacade) {}

  public ngOnInit(): void {
    //this.facade.articles$.subscribe((value) => this.articlesList = value);
  }
}
