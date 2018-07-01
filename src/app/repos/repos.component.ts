import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.less']
})
export class ReposComponent {

  errors: Error[];

  constructor() {}

  search(userName: string) {

    this.errors = [];

    if (!userName) {
      console.log('puss');
      this.errors.push(
        new Error('Invalid user name.')
      );
    }
  }

}
