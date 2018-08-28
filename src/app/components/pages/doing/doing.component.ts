import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { TeamService } from '../../../services/team.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-doing',
  templateUrl: './doing.component.html',
  styleUrls: ['./doing.component.scss']
})
export class DoingComponent implements OnInit {
  config = this.dataSvc.getConfig();
  board;

  constructor(private dataSvc: DataService, private teamSvc: TeamService, public dialog: DialogService) { }

  ngOnInit() {
    this.getSelectedBoard();
  }
  getSelectedBoard() {
    this.board = this.dataSvc.getBoards()
      .then(boards => boards.filter(board => this.teamSvc.getSelectedTeam() === board.id)[0]);
  }
  onTeamChange() {
    this.getSelectedBoard();
  }

}
