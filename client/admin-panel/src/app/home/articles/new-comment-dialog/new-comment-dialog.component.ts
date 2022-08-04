import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleFacade } from '@state/articles/article.facade';

@Component({
  selector: 'app-new-comment-dialog',
  templateUrl: './new-comment-dialog.component.html',
  styleUrls: ['./new-comment-dialog.component.scss'],
})
export class NewCommentDialogComponent implements OnInit {
  public body: string;
  public slug: string;

  constructor(
    public facade: ArticleFacade,
    private dialogRef: MatDialogRef<NewCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { slug: string }
  ) {}

  public ngOnInit(): void {
    this.slug = this.data.slug;
  }

  public createComment(): void {
    this.facade.createComment(this.slug, this.body);
    this.closeDialog();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
