import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { UserFacade } from '@state/user/user.facade';
import { GetArticlePayload, User } from '@state/user/user.model';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public usersList$: Observable<User[]>;
  public usersCount$: Observable<number>;
  public articleForm: FormData;
  public usersCount: number;
  public pageIndex = 0;
  public searchTerm: string;
  public pageSize = 3;
  public pageSizeOptions: number[] = [3, 6, 9];

  constructor(
    private facade: UserFacade,
    public dialog: MatDialog,
    public router: Router
  ) {}

  public ngOnInit(): void {
    this.usersCount$ = this.facade.usersCount$;
    this.usersList$ = this.facade.users$;
    this.usersCount$.pipe(untilDestroyed(this)).subscribe((total) => {
      this.usersCount = total;
    });
    this.facade.getUsers({
      limit: this.pageSize?.toString(),
      page: this.pageIndex?.toString(),
      searchTerm: (this.searchTerm = ''),
    } as GetArticlePayload);
  }

  public search(): void {
    this.facade.getUsers({
      limit: this.pageSize?.toString(),
      page: this.pageIndex?.toString(),
      searchTerm: this.searchTerm,
    } as GetArticlePayload);
  }

  public openDialog(username: User['username']): void {
    this.facade.selectUser(username);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { username: username };
    dialogConfig.disableClose = false;
    this.dialog.open(UserDialogComponent, dialogConfig);
  }

  public toAdminPanel(): void {
    this.router.navigate(['']);
  }

  public setPaginator(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateList();
  }

  public paginateList(): void {
    this.facade.getUsers({
      limit: this.pageSize?.toString(),
      page: this.pageIndex?.toString(),
      searchTerm: this.searchTerm,
    } as GetArticlePayload);
  }
}
