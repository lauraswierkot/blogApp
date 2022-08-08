import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ArticleFacade } from '@state/articles/article.facade';
import { Comment, UpdatedComment } from '@state/articles/article.model';

export interface CommentInterface {
  comment: Comment;
  slug: string;
}

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  public commentForm: FormGroup;
  public updatedComment: UpdatedComment;
  public author: string;
  public comment: Comment;

  constructor(
    public facade: ArticleFacade,
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CommentFormComponent>,
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
