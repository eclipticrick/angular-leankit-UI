import { Component, ElementRef, OnInit } from '@angular/core';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public element: ElementRef, public dialog: DialogService) { }

  ngOnInit() {
  }

}
