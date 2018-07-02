import {
  AfterContentChecked,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { routeAnimation } from './app.animations';
import {NavbarComponent} from './components/parts/navbar/navbar.component';
import {FooterComponent} from './components/parts/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimation ]
})
export class AppComponent implements OnInit, AfterContentChecked {
  @ViewChild('navbar') navbarRef: NavbarComponent;
  @ViewChild('footer') footerRef: FooterComponent;
  @ViewChild('main') mainBody: ElementRef;
  minContentHeight;
  theme = 'hu-light-theme';
  @HostBinding('class') hostClasses: string = this.theme;

  constructor(private overlayContainer: OverlayContainer) {
    this.onThemeChange(this.theme);
  }

  ngOnInit(): void {
    // set theme class on overlayContainer
    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }
  ngAfterContentChecked(): void {
    // calculate min-height as soon as all the content has been loaded and checked (footer + navbar etc.)
    this.calculateMinBodyHeight();
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

  calculateMinBodyHeight() {
    const heightNavbar = this.navbarRef.element.nativeElement.querySelector('#navbar').offsetHeight;
    const heightFooter = this.footerRef.element.nativeElement.querySelector('#footer').offsetHeight;
    this.minContentHeight = window.innerHeight - heightNavbar - heightFooter;
  }

  @HostListener('window:resize', ['$event']) onResize() {
    this.calculateMinBodyHeight();
  }
}
