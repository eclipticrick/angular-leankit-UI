import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dialog-content-person',
  templateUrl: './dialog-content-person.component.html',
  styleUrls: ['./dialog-content-person.component.scss']
})
export class DialogContentPersonComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
    // this.data.id;
  }

}
