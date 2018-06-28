import {Component, HostBinding, OnInit} from '@angular/core';
import { routeAnimation } from './app.animations';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimation ]
})
export class AppComponent implements OnInit {
  theme = 'theme-hu-light';
  @HostBinding('class') hostClasses: string = this.theme;

  constructor(private overlayContainer: OverlayContainer) {
    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }

  ngOnInit() {
    this.onThemeChange(this.theme);
  }

  getComponentDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }

  onThemeChange(theme) {
    // set theme class on <app-root>
    this.hostClasses = theme;

    // set theme class on overlayContainer
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    overlayContainerClasses.remove(this.theme);
    this.theme = theme;
    overlayContainerClasses.add(this.theme);
  }
}
