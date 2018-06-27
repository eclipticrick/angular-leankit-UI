import { Component } from '@angular/core';
import { routeAnimation } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimation ]
})
export class AppComponent {
  getComponentDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }
}
