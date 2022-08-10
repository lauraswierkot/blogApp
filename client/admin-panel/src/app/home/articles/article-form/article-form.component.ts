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
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ArticleFacade } from '@state/articles/article.facade';
import { Article } from '@state/articles/article.model';
import { environment } from 'environments/environment';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit, OnDestroy {
  public articleForm: FormGroup;
  public selectedArticle: Article;
  public commentMaxLength = 20; 
  private imageUrl: string = environment.apiImageUrl;

  readonly separatorKeysCodes = [ENTER, COMMA];
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public fileSource: string | ArrayBuffer;

  constructor(
    private facade: ArticleFacade,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private changeDetector: ChangeDetectorRef
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
        this.initForm();
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

  public get comments(): FormArray {
    return this.articleForm.get('comments').value;
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
      const fileFromInput = event.currentTarget.files[0];
      this.articleForm.patchValue({
        file: fileFromInput,
      });
      reader.readAsDataURL(fileFromInput);
      reader.onload = () => {
        this.fileSource = reader.result;
        this.changeDetector.markForCheck();
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

  public deleteComment(slug: string, id: number): void {
    this.facade.deleteComment(slug, id);
  }

  private initForm(): void {
    this.articleForm = this.formBuilder.group({
      title: [this.selectedArticle?.title, Validators.required],
      body: [this.selectedArticle?.body, Validators.required],
      file: [this.selectedArticle?.image, Validators.required],
      description: [this.selectedArticle?.description, Validators.required],
      tagList: [
        this.selectedArticle === null ? '' : this.selectedArticle?.tagList,
        Validators.required,
      ],
      comments: this.formBuilder.array([]),
    });

    this.articleForm.setControl(
      'comments',
      this.formBuilder.array(this.selectedArticle.comments || [])
    );

    if (this.selectedArticle) {
      this.fileSource = `${this.imageUrl}/${this.selectedArticle.image}`;
    }
  }

  public ngOnDestroy(): void {
    this.facade.resetArticle();
  }
}
