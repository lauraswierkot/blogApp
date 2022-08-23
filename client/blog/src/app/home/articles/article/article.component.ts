import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ArticleFacade } from '@state/articles/article.facade';
import {
  Article,
  Comment,
  UpdatedComment,
} from '@state/articles/article.model';
import { environment } from 'environments/environment';
import { UserFacade } from '@state/user/user.facade';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  public selectedArticle: Article;
  public imageUrl: string = environment.apiImageUrl;
  public fileSource: string | ArrayBuffer;
  public user$ = this.userFacade.user$;

  public createCommentForm: FormGroup;
  public editCommentsForm: FormGroup;

  constructor(
    private facade: ArticleFacade,
    private userFacade: UserFacade,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    this.facade.selectArticle(slug);

    this.facade.selectedArticle$
      .pipe(untilDestroyed(this))
      .subscribe((article) => {
        this.selectedArticle = article;
        this.fileSource = `${this.imageUrl}${article?.image}`;
        this.initEditCommentsForm();
        this.initCreateCommentForm();
      });
  }

  public toggleCommentEdit(index: number): void {
    this.comments[index].patchValue({ editable: true });
  }

  public submitCreateCommentForm(): void {
    this.facade.createComment(
      this.selectedArticle.slug,
      this.createCommentForm?.value['body']
    );
  }

  public saveUpdatedComment(index: number): void {
    this.comments[index].patchValue({ editable: false });
    this.facade.updateComment({
      slug: this.selectedArticle.slug,
      body: this.editCommentsForm.controls['comments']['controls'][index].value
        .body,
      id: this.editCommentsForm.controls['comments']['controls'][index].value
        .id,
    });
  }

  private initEditCommentsForm(): void {
    this.editCommentsForm = this.formBuilder.group({
      comments: this.formBuilder.array([]),
    });
    this.selectedArticle?.comments?.forEach((comment) => {
      this.addCommentToEditFormArray(
        comment.body,
        comment.author.username,
        comment.id
      );
    });
  }

  private addCommentToEditFormArray(
    body: string,
    author: string,
    id: number
  ): void {
    const comment = this.formBuilder.group({
      body: this.formBuilder.control(body),
      author: this.formBuilder.control(author),
      id: this.formBuilder.control(id),
      editable: this.formBuilder.control(false),
    });
    this.comments.push(comment);
  }

  private initCreateCommentForm(): void {
    this.createCommentForm = this.formBuilder.group({
      body: ['', Validators.required],
    });
  }

  public get body(): AbstractControl {
    return this.createCommentForm.get('body');
  }

  public get comments(): FormGroup[] {
    return this.editCommentsForm.controls['comments'][
      'controls'
    ] as FormGroup[];
  }

  public ngOnDestroy(): void {
    this.facade.resetArticle();
  }
}
