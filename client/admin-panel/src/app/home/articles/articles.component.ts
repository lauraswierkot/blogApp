import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/state/articles/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  public articlesList: Article[] = [];
}
