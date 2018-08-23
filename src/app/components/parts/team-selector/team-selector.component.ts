import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.scss']
})
export class TeamSelectorComponent implements OnInit {
  @Input() multiple?: boolean;
  @Input() placeholder?: string;
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();
  config = this.data.getConfig();

  teams;
  selectedTeams;
  selectedTeamId;

  constructor(private data: DataService, public teamSvc: TeamService) {
    if (typeof this.multiple === 'undefined') this.multiple = true;
    this.teams = this.teamSvc.getPossibleTeams();
    this.selectedTeams = this.teamSvc.getSelectedTeams();
    this.selectedTeamId = this.teamSvc.getSelectedTeam();
  }

  ngOnInit() {}

  onTeamChanges() {
    if (this.multiple) this.teamSvc.setSelectedTeams(this.selectedTeams);
    else this.teamSvc.setSelectedTeam(this.selectedTeamId);
    this.selectionChanged.emit();
  }
}
