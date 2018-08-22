import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dialog-content-contact',
  templateUrl: './dialog-content-contact.component.html',
  styleUrls: ['./dialog-content-contact.component.scss']
})
export class DialogContentContactComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
