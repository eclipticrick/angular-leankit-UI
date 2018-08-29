import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lane } from '../../../enums/Lane.enum';
import { DialogService } from '../../../services/dialog.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() page: string;
  @Output() teamChanged: EventEmitter<any> = new EventEmitter<any>();
  title = '';

  config = this.dataSvc.getConfig();

  constructor(public dialog: DialogService, private dataSvc: DataService) { }

  ngOnInit() {
    if (this.page === Lane.doing) {
      this.title = 'Doing';
    }
    if (this.page === Lane.backlog) {
      this.title = 'Backlog';
    }
  }

  onTeamChange() {
    this.teamChanged.emit();
  }
}
