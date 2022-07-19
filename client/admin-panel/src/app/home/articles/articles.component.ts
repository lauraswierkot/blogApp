import { Component } from '@angular/core';
import { ArticleResponse } from '@state/articles/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  public articlesList: ArticleResponse[] = [];
}
