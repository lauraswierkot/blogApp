import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ArticleFacade } from '@state/articles/article.facade';
import {
  Article,
  UpdatedComment,
  Comment,
  CommentInterface,
} from '@state/articles/article.model';
import { environment } from 'environments/environment';
import { UserFacade } from '@state/user/user.facade';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';

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

  public commentForm: FormGroup;
  public updatedComment: UpdatedComment;
  public author: string;
  public comment: Comment;

  public data: UpdatedComment;
  public user$ = this.userFacade.user$;

  constructor(
    private facade: ArticleFacade,
    private userFacade: UserFacade,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public dialog: MatDialog
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
        this.fileSource = `${this.imageUrl}${this.selectedArticle?.image}`;
        this.data = this.selectedArticle.comments[0];
      });
    this.commentForm = this.formBuilder.group({
      slug: [this.data?.slug, Validators.required],
      id: [this.data?.id, Validators.required],
      body: ['', Validators.required],
    });
    this.updatedComment = this.commentForm?.value as UpdatedComment;
    this.author = this.selectedArticle?.comments[0].author.username;
  }

  public get body(): AbstractControl {
    return this.commentForm.get('body');
  }

  public submit(): void {
    this.facade.createComment(
      this.selectedArticle.slug,
      this.commentForm?.value['body']
    );
  }

  public toAdminPanel(): void {
    this.router.navigate(['']);
  }

  public toArticles(): void {
    this.router.navigate(['']);
  }

  public openDialog(comment: Comment): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      comment,
      slug: this.selectedArticle.slug,
    } as CommentInterface;
    dialogConfig.disableClose = false;
    this.dialog.open(CommentDialogComponent, dialogConfig);
  }

  public ngOnDestroy(): void {
    this.facade.resetArticle();
  }
}
