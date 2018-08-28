import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-content-help',
  templateUrl: './dialog-content-help.component.html',
  styleUrls: ['./dialog-content-help.component.scss']
})
export class DialogContentHelpComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() { }

}
