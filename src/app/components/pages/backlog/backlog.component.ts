import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {TeamService} from '../../../services/team.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
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
