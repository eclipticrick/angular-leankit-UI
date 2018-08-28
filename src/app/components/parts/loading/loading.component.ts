import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() type?: string;

  // for both types: (primary/ accent/ warn)
  @Input() color?: string;
  @Input() inline?: boolean;

  // for type === bar
  @Input() mode?: string;

  // for type === spinner
  @Input() diameter?: number;
  @Input() verticalAlign?: string;

  constructor() { }

  ngOnInit() {
    if (!this.type) this.type = 'bar';
    if (!this.color) this.color = 'primary';
    if (!this.inline) this.inline = false;
    if (!this.mode) this.mode = 'indeterminate';
    if (!this.diameter) this.diameter = 16;
    if (!this.verticalAlign) this.verticalAlign = '';
  }

}
