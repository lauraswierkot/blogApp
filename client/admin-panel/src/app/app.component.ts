import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ArticleFacade } from './state/articles/article.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'admin-panel';

  constructor(private facadeArticle: ArticleFacade) {}

  ngOnInit(): void {
    //this.facadeArticle.getArticles();
  }
}
