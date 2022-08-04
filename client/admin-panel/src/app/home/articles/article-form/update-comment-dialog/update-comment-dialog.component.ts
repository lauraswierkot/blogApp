import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleFacade } from '@state/articles/article.facade';
import { Comment } from '@state/articles/article.model';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './update-comment-dialog.component.html',
  styleUrls: ['./update-comment-dialog.component.scss'],
})
export class UpdateCommentDialogComponent implements OnInit {
  public comment: Comment;
  public body: string;
  public slug: string;
  public author: string;

  public ngOnInit(): void {
    this.body = this.data.comment.body;
    this.comment = this.data.comment;
    this.slug = this.data.slug;
    this.author = this.data.comment?.author.username;
  }

  constructor(
    public facade: ArticleFacade,
    private dialogRef: MatDialogRef<UpdateCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { comment: Comment; slug: string }
  ) {}

  public updateComment(): void {
    this.facade.updateComment(this.slug, this.body, this.comment.id);
    this.closeDialog();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
