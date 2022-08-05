import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { UserFacade } from '@state/user/user.facade';
import { User } from '@state/user/user.model';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public usersList: Observable<User[]>;
  public articleForm: FormData;
  public searchTerm: string;

  constructor(private facade: UserFacade, public dialog: MatDialog, public router: Router) {}

  public ngOnInit(): void {
    this.usersList = this.facade.users$;
    this.facade.getUsers();
  }

  public search(): void {
    this.facade.getUsers(this.searchTerm);
  }

  public openDialog(username: string): void {
    this.facade.selectUser(username);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { username: username };
    dialogConfig.disableClose = false;
    this.dialog.open(UserDialogComponent, dialogConfig);
  }

  public toAdminPanel(): void {
    this.router.navigate(['']);
  }
}
