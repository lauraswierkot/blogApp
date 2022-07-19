import { Component, OnInit } from '@angular/core';
import { ArticleFacade } from '@state/articles/article.facade';
import { Article } from '@state/articles/article.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  public articlesList: Observable<Article[]>;
  constructor(private facade: ArticleFacade) {}

  public ngOnInit(): void {
    this.articlesList = this.facade.articles$;
    this.facade.getArticles();
  }
}
