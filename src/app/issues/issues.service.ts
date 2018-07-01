import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user';
import { map } from 'rxjs/operators';

export class Issue {
  id: number;
  title: string;
  html_url: string;
  number: number;
  user: User;
}

interface ApiRequestOptions {
  user: string;
  repo: string;
}

@Injectable()

export class IssuesService {

  private baseUrl = 'https://api.github.com/search/issues';

  constructor(private http: HttpClient) {}

  getAll(options: ApiRequestOptions): Observable<Issue[]> {
    const { user, repo } = options;

    const url = `${this.baseUrl}?q=repo:${user}/${repo}+is:open+is:issue`;

    return this.http.get<Issue[]>(url)
      .pipe(
        map((response: { items: Issue[] }) => {
          return response.items;
        })
      );
  }
}
