import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {TeamService} from '../../../services/team.service';

@Component({
  selector: 'app-doing',
  templateUrl: './doing.component.html',
  styleUrls: ['./doing.component.scss']
})
export class DoingComponent implements OnInit {
  config = this.data.getConfig();
  board;

  constructor(private data: DataService, private teamSvc: TeamService) { }

  ngOnInit() {
    this.getSelectedBoard();
  }
  getSelectedBoard() {
    this.board = this.data.getBoards()
      .then(boards => boards.filter(board => this.teamSvc.getSelectedTeam() === board.id)[0]);
  }
  onTeamChange() {
    this.getSelectedBoard();
  }

}
