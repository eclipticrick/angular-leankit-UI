import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-dialog-content-team',
  templateUrl: './dialog-content-team.component.html',
  styleUrls: ['./dialog-content-team.component.scss']
})
export class DialogContentTeamComponent implements OnInit {
  @Input() data: any;
  config = this.dataSvc.getConfig();

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
  }

}
