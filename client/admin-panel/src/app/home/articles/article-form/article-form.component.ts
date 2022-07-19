import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ArticleFacade } from '@state/articles/article.facade';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent {
  public articleForm: FormGroup;

  constructor(
    private facade: ArticleFacade,
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.articleForm = formBuilder.group({
      title: ['tes', Validators.required],
      body: ['test', Validators.required],
      file: ['', Validators.required],
      description: ['test', Validators.required],
      tagList: ['test', Validators.required],
    });
  }

  public get title(): AbstractControl {
    return this.articleForm.get('title');
  }

  public get body(): AbstractControl {
    return this.articleForm.get('body');
  }

  public get file(): AbstractControl {
    return this.articleForm.get('file');
  }

  public get description(): AbstractControl {
    return this.articleForm.get('description');
  }

  public get tagList(): AbstractControl {
    return this.articleForm.get('tagList');
  }

  public createArticle(): void {
    let formData: FormData = new FormData();
    formData.append('title', this.title.value);
    formData.append('description', this.description.value);
    formData.append('body', this.body.value);
    formData.append('file', this.file.value);
    formData.append('tagList', this.tagList.value);
    this.facade.createArticle(formData);
  }

  public onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.articleForm.get('file').setValue(file);
    }
  }

  public toAdminPanel(): void {
    this.router.navigate(['']);
  }
}
