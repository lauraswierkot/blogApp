import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ArticleFacade } from '@state/articles/article.facade';
import { Article } from '@state/articles/article.model';
import { environment } from 'environments/environment';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  public selectedArticle: Article;
  public commentIndex = 0;
  public commentMaxLength = 20;
  public imageUrl: string = environment.apiImageUrl;
  public fileSource: string | ArrayBuffer;

  constructor(
    private facade: ArticleFacade,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    if (slug) {
      this.facade.selectArticle(slug);
    }
    this.facade.selectedArticle$
      .pipe(untilDestroyed(this))
      .subscribe((article) => {
        this.selectedArticle = article;
      });
    this.fileSource = `${this.imageUrl}/${this.selectedArticle?.image}`
  }

  public toAdminPanel(): void {
    this.router.navigate(['']);
  }

  public toArticles(): void {
    this.router.navigate(['']);
  }

  public ngOnDestroy(): void {
    this.facade.resetArticle();
  }
}
