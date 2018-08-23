import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../../services/data.service';

@Component({
  selector: 'app-dialog-content-card',
  templateUrl: './dialog-content-card.component.html',
  styleUrls: ['./dialog-content-card.component.scss']
})
export class DialogContentCardComponent implements OnInit {
  config = this.dataSvc.getConfig();
  @Input() data: any;

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
    // this.data.id;
  }

}
