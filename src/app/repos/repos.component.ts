import { Component, OnInit } from '@angular/core';
import { ReposService, Repo } from './repos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.less']
})
export class ReposComponent {

  errors: Error[];

  repos$: Observable<Repo[]>;

  constructor(private service: ReposService) {}

  search(user: string) {

    this.errors = [];

    if (!user) {
      this.errors.push(
        new Error('Invalid user name.')
      );
    } else {
      this.repos$ = this.service.getAll({ user });
    }
  }

}
