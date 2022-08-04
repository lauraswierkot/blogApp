import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleFacade } from '@state/articles/article.facade';
import { Article, Comment } from '@state/articles/article.model';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss'],
})
export class CommentDialogComponent implements OnInit {
  public comment: Comment;
  public body: string;
  public slug: string;
  public author: string;

  public ngOnInit(): void {
     this.body = this.data.comment.body;
     this.comment = this.data.comment;
     this.slug = this.data.slug;
     this.author = this.data.comment.author;
  }

  constructor(
    public facade: ArticleFacade,
    private dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { comment: Comment; slug: string }
  ) {}

  public updateComment(): void {
    this.facade.updateComment(
      this.slug,
      this.body,
      this.comment.id
    );
    this.dialogRef.close();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
