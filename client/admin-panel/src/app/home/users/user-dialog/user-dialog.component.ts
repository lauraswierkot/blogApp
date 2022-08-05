import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { UpdateCommentDialogComponent } from '@home/articles/article-form/update-comment-dialog/update-comment-dialog.component';
import { User } from '@state/user/user.model';
import { UserFacade } from '@state/user/user.facade';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  public selectedUser: User;
  public username: string = '';

  public ngOnInit(): void {
    this.facade.selectedUser$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.selectedUser = user;
    });
  }

  constructor(
    public facade: UserFacade,
    private dialogRef: MatDialogRef<UpdateCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { username: string }
  ) {}

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
