import { Component, OnInit, Input } from '@angular/core';
import { ReposService, Repo } from './repos.service';
import { Observable } from 'rxjs';
import { User } from '../types/user';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.less']
})
export class RepoComponent {

  @Input() repo: Repo;

  @Input() user: User;

  constructor(private service: ReposService) {}
}
