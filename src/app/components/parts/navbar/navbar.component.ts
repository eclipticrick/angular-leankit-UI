import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() theme: EventEmitter<string> = new EventEmitter<string>();
  isDarkTheme = false;
  scrollPosition = 0;

  constructor(public element: ElementRef, public dialog: DialogService) { }

  ngOnInit() {}

  setTheme(checked: boolean) {
    this.isDarkTheme = checked;
    if (checked) {
      this.theme.emit('hu-dark-theme');
    } else {
      this.theme.emit('hu-light-theme');
    }
  }

  @HostListener('window:scroll', ['$event']) checkScroll() {
    this.scrollPosition = window.pageYOffset;
  }
}
