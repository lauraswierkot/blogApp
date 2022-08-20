import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ArticleFacade } from '@state/articles/article.facade';
import {
  Article,
  Comment,
  CommentInterface,
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
  public commentIndex = 0;
  public commentMaxLength = 20;
  public imageUrl: string = environment.apiImageUrl;
  public fileSource: string | ArrayBuffer;

  public comment: Comment;
  
  public user$ = this.userFacade.user$;

  public createCommentForm: FormGroup;
  public editCommentsForm: FormGroup;
  
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
      });
      
    this.createCommentForm = this.formBuilder.group({
      body: ['', Validators.required],
    });

    this.editCommentsForm = this.formBuilder.group({
      comments: this.formBuilder.array([])
    })

    this.selectedArticle?.comments?.forEach(el => {
      this.addCommentToEditFormArray(el.body, el.author.username, el.id)
    })
  }

  public get body(): AbstractControl {
    return this.createCommentForm.get('body');
  }
  
  public get comments() {
    return this.editCommentsForm.controls['comments']['controls'] as FormGroup[];
  }
  public saveUpdatedComment(index: number) {
    console.log(this.editCommentsForm.controls['comments']['controls'][index])
    this.editCommentsForm.controls['comments']['controls'][index].value.editable = false

    this.facade.updateComment({slug: this.selectedArticle.slug, body: this.editCommentsForm.controls['comments']['controls'][index].value.body, id: this.editCommentsForm.controls['comments']['controls'][index].value.id } as UpdatedComment)
  }

  public edit(index: number) : void {
    this.editCommentsForm.controls['comments']['controls'][index].value.editable = true
    console.log(this.editCommentsForm.controls['comments']['controls'][index].value.editable)
  }

  public submitCreateCommentForm(): void {
    this.facade.createComment(
      this.selectedArticle.slug,
      this.createCommentForm?.value['body']
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
    //this.dialog.open(CommentDialogComponent, dialogConfig);
  }

  private addCommentToEditFormArray(body: string, author: string, id: number) {
    const comment = this.formBuilder.group({
      body: [body],
      author: [author],
      id: [id],
      editable: [false]
    });
    this.comments.push(comment);
  }

  public ngOnDestroy(): void {
    this.facade.resetArticle();
  }
}
