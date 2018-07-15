import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() type?: string;
  @Input() color?: string;
  @Input() mode?: string;
  constructor() { }

  ngOnInit() {
    if (!this.type) this.type = 'bar';
    if (!this.color) this.color = 'primary';
    if (!this.mode) this.mode = 'indeterminate';
  }

}
