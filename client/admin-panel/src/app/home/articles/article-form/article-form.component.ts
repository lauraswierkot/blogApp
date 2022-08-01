import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ArticleFacade } from '@state/articles/article.facade';
import { Article } from '@state/articles/article.model';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit, OnDestroy {
  public articleForm: FormGroup;
  public selectedArticle: Article;

  readonly separatorKeysCodes = [ENTER, COMMA];
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public fileSource: string | ArrayBuffer;

  constructor(
    private facade: ArticleFacade,
    private router: Router,
    public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.facade.selectedArticles$
      .pipe(untilDestroyed(this))
      .subscribe((article: Article) => (this.selectedArticle = article));
    this.articleForm = this.formBuilder.group({
      title: [this.selectedArticle?.title, Validators.required],
      body: [this.selectedArticle?.body, Validators.required],
      file: [null, Validators.required],
      description: [this.selectedArticle?.description, Validators.required],
      tagList: [
        this.selectedArticle === null ? '' : this.selectedArticle?.tagList,
        Validators.required,
      ],
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

  public submitForm(): void {
    const formData: FormData = new FormData();
    formData.append('title', this.title.value);
    formData.append('description', this.description.value);
    formData.append('body', this.body.value);
    formData.append('file', this.file.value);
    formData.append('tagList', this.tagList.value);
    if (this.selectedArticle !== null) {
      this.facade.updateArticle(this.selectedArticle.slug, formData);
    } else {
      this.facade.createArticle(formData);
    }
  }

  public onFileSelect(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.articleForm.patchValue({
          file: reader.result,
        });
        this.fileSource = reader.result;
        this.cd.markForCheck();
      };
    }
  }

  public toAdminPanel(): void {
    this.router.navigate(['']);
  }

  public addTag(event: MatChipInputEvent): void {
    const value = event?.value?.trim();
    if (value && !!value?.length) {
      this.articleForm.controls['tagList'].patchValue([
        ...this.articleForm.controls['tagList'].value,
        value,
      ]);
      this.articleForm.controls['tagList'].updateValueAndValidity();
      event.chipInput.clear();
    }
  }

  public removeTag(tag: string): void {
    const index = this.articleForm.controls['tagList'].value.indexOf(tag);
    if (index >= 0) {
      this.articleForm.controls['tagList'].value.splice(index, 1);
      this.articleForm.controls['tagList'].updateValueAndValidity();
    }
  }

  public ngOnDestroy(): void {
    this.facade.resetArticle();
  }
}
