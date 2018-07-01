import { Component, OnInit } from '@angular/core';
import { ReposService, Repo } from './repos.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.less']
})
export class ReposComponent {

  errors: Error[];

  repos$: Observable<{} | Repo[]>;

  user: string;

  constructor(private service: ReposService) {}

  search(user: string) {

    this.errors = null;

    if (!user) {
      this.errors = [new Error('Invalid user name.')];
    } else {
      this.user = user;
      this.repos$ = this.service.getAll({ user })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.errors = error.error.errors;
            return [];
          })
        );
    }
  }

}
