import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReposComponent } from './repos/repos.component';
import { IssuesComponent } from './issues/issues.component';

const routes: Routes = [
  {
    path: '',
    component: ReposComponent
  },
  {
    path: 'repos/:user/:repo/issues',
    component: IssuesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
