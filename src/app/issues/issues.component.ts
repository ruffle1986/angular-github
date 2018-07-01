import { Component, OnInit } from '@angular/core';
import { IssuesService, Issue } from './issues.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.less']
})
export class IssuesComponent implements OnInit {

  errors: Error[];

  issues$: Observable<Issue[]>;

  repo: string;

  constructor(
    private service: IssuesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const { user, repo } = this.route.snapshot.params;
    this.repo = repo;
    this.issues$ = this.service.getAll({ user, repo })
      .pipe(
        catchError((error) => {
          this.errors = error.error.errors;
          return [];
        })
      );
  }

}
