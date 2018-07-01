import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReposComponent } from './repos/repos.component';
import { RepoComponent } from './repos/repo.component';

import { HttpClientModule } from '@angular/common/http';
import { ReposService } from './repos/repos.service';
import { IssuesComponent } from './issues/issues.component';
import { IssuesService } from './issues/issues.service';

@NgModule({
  declarations: [
    AppComponent,
    ReposComponent,
    RepoComponent,
    IssuesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ReposService, IssuesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
