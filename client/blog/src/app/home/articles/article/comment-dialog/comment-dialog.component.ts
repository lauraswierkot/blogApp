import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleFacade } from '@state/articles/article.facade';
import { CommentInterface, UpdatedComment } from '@state/articles/article.model';
import { ArticleComponent } from '../article.component';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  public commentForm: FormGroup;
  public updatedComment: UpdatedComment;
  public author: string;
  public comment: Comment;
 
  constructor(
    public facade: ArticleFacade,
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommentInterface
  ) {}
 
  public ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      slug: [this.data?.slug, Validators.required],
      id: [this.data.comment?.id, Validators.required],
      body: [this.data.comment?.body, Validators.required],
    });
    this.updatedComment = this.commentForm?.value as UpdatedComment;
    this.author = this.data.comment?.author?.username;
  }
 
  public get body(): AbstractControl {
    return this.commentForm.get('body');
  }
 
  public submit(): void {
    this.updatedComment.body = this.commentForm.value.body;
    this.facade.updateComment(this.updatedComment);
    this.closeDialog();
  }
 
  public closeDialog(): void {
      this.dialogRef.close();
  }


}
