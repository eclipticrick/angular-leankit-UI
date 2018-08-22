import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dialog-content-card',
  templateUrl: './dialog-content-card.component.html',
  styleUrls: ['./dialog-content-card.component.scss']
})
export class DialogContentCardComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
    // this.data.id;
  }

}
