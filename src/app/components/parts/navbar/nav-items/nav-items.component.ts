import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-items',
  template: `
  <div class="flex">
    <button type="button" mat-button routerLinkActive="active" routerLink="/" [routerLinkActiveOptions]="{ exact: true }">
      Dashboard
    </button>
    <button type="button" mat-button routerLinkActive="active" routerLink="/backlog">
      Backlog
    </button>
    <button type="button" mat-button routerLinkActive="active" routerLink="/doing">
      Doing
    </button>
  </div>
  `
})
export class NavItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
