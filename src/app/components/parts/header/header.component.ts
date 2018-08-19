import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { TeamService } from '../../../services/team.service';
import {Lane} from '../../../enums/Lane.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() page: string;
  @Output() teamChanged: EventEmitter<any> = new EventEmitter<any>();
  title = '';
  tooltipMessage = '';

  constructor() {}

  ngOnInit() {
    if (this.page === Lane.doing) {
      this.title = 'Doing';
      this.tooltipMessage = 'Wat is Doing?';
    }
    if (this.page === Lane.backlog) {
      this.title = 'Backlog';
      this.tooltipMessage = 'Wat is een Backlog?';
    }
  }

  onTeamChange() {
    this.teamChanged.emit();
  }
}
