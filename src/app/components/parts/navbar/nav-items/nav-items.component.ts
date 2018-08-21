import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-items',
  template: `
  <div class="flex">
    <button mat-button routerLinkActive="active" routerLink="/" [routerLinkActiveOptions]="{ exact: true }">
      Dashboard
    </button>
    <button mat-button routerLinkActive="active" routerLink="/backlog">
      Backlog
    </button>
    <button mat-button routerLinkActive="active" routerLink="/doing">
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
