import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ArticleFacade } from 'src/app/state/articles/article.facade';
import { ArticleForm } from 'src/app/state/articles/article.model';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent {
  public articleForm: FormGroup;

  constructor(private facade: ArticleFacade, private router: Router) {
    this.articleForm = new FormGroup({
      title: new FormControl('', { validators: Validators.required }),
      body: new FormControl('', { validators: Validators.required }),
      image: new FormControl('', { validators: Validators.required }),
      description: new FormControl('', { validators: Validators.required }),
      tagList: new FormControl('', Validators.required),
    });
  }

  public get title(): AbstractControl {
    return this.articleForm.get('title');
  }

  public get body(): AbstractControl {
    return this.articleForm.get('body');
  }

  public get image(): AbstractControl {
    return this.articleForm.get('image');
  }

  public get description(): AbstractControl {
    return this.articleForm.get('description');
  }

  public get tagList(): AbstractControl {
    return this.articleForm.get('tagList');
  }

  public createArticle(): void {
    const article: ArticleForm = {
      title: this.articleForm.value.article,
      body: this.articleForm.value.body,
      image: this.articleForm.value.image,
      description: this.articleForm.value.description,
      tagList: this.articleForm.value.tagList,
    };
    this.facade.createArticle(article);
  }

  public toAdminPanel(): void {
    this.router.navigate(['']);
  }
}
