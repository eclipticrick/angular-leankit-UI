import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-items',
  template: `
  <div class="flex-container">
    <button mat-button routerLinkActive="active" routerLink="/" [routerLinkActiveOptions]="{ exact: true }">
      Homeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    </button>
    <button mat-button routerLinkActive="active" routerLink="/nothome">
      NotHomeeeeeeeeeeeeeeeeee
    </button>
    <button mat-button>
      Somethinggggggggggggggggggggggggggggggggg
    </button>
  </div>

  `
})
export class NavItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
