import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { TeamService } from '../../../services/team.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  config = this.dataSvc.getConfig();
  boards;

  constructor(private dataSvc: DataService, private teamSvc: TeamService, public dialog: DialogService) { }

  ngOnInit() {
    this.getSelectedBoards();
  }

  onTeamsChange() {
    this.getSelectedBoards();
  }

  getSelectedBoards () {
    this.boards = this.dataSvc.getBoards()
      .then(boards => boards.filter(board => this.teamSvc.getSelectedTeams().includes(board.id)));
  }

  ngOnDestroy() {}
}
