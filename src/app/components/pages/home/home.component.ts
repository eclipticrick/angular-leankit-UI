import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { CardType } from '../../../enums/CardType.enum';
import { Lane } from '../../../enums/Lane.enum';
import {TeamService} from '../../../services/team.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  config = this.data.getConfig();
  boards;

  constructor(private data: DataService, private teamSvc: TeamService) { }

  ngOnInit() {
    this.getBoardsAndFilterOnSelectedTeams();
  }

  getBoardsAndFilterOnSelectedTeams () {
    this.boards = this.data.getBoards()
      .then(boards => boards.filter(board => this.teamSvc.getSelectedTeams().includes(board.id)));
  }

  /**
   * TEMP
   */
  printDataInfo() {
    this.data.getBoards().then(boards => {
      console.log('boards', boards);
      console.log('board', boards[1]);
      this.data.getCards(boards[1].id, Lane.all, CardType.all)
        .then(cards => {
          console.log('cards', cards);
          this.data.getCardInfo(cards[0].id)
            .then(cardInfo => {
              console.log('cardInfo', cardInfo);
            });
          this.data.getCardTasks(cards[0].id)
            .then(tasks => {
              console.log('getCardTasks(', cards[0].id, ')', tasks);
              tasks.forEach(task => {
                this.data.getCardTaskInfo(cards[0].id, task.id)
                  .then(taskInfo => {
                    console.log('getCardTaskInfo(', cards[0].id, ', ', task.id, ')', taskInfo);
                  });
              });

            });
          this.data.getChildCards(cards[0].id)
            .then(childCards => {
              console.log('getChildCards(', cards[0].id, ')', childCards);
            });
        });
    });
  }

  ngOnDestroy() {}
}
