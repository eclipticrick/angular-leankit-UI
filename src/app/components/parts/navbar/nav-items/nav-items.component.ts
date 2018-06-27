import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-items',
  template: `
  <div class="flex-container">
    <button mat-button routerLinkActive="active" routerLink="/" [routerLinkActiveOptions]="{ exact: true }">
      Home
    </button>
    <button mat-button routerLinkActive="active" routerLink="/nothome">
      NotHome
    </button>
    <button mat-button>
      Somethingggggggggggggggg
    </button>
  </div>

  `
})
export class NavItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
