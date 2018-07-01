import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user';
import { map } from 'rxjs/operators';

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  forks_count: number;
  stargazers_count: number;
  open_issues_count: number;
  watchers_count: number;
  owner: User;
}

interface ApiRequestOptions {
  user: string;
}

@Injectable()

export class ReposService {

  private baseUrl = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient) {}

  getAll(options: ApiRequestOptions): Observable<Repo[]> {
    const { user } = options;

    const url = `${this.baseUrl}?q=user:${user}`;

    return this.http.get<Repo[]>(url)
      .pipe(
        map((response: { items: Repo[] }) => {
          return response.items;
        })
      );
  }
}
