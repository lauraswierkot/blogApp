import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './home';
import { AdminPanelComponent } from './home/admin-panel/admin-panel.component';

const routes: Routes = [
  {
      path: '',
      component: AdminPanelComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
