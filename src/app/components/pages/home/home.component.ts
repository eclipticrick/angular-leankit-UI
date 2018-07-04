import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeankitService } from '../../../services/leankit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  boards$ = null;
  boardsInfo$ = {};
  boards$subscription = null;
  constructor(private leankit: LeankitService) { }

  ngOnInit() {
    this.boards$ = this.leankit.getBoards();

    this.boards$.subscribe(boards => {
      boards.forEach(board => {
        this.boardsInfo$[board.id] = this.leankit.getBoard(board.id);
      });
    });

  }

  ngOnDestroy() {
    if (this.boards$subscription) this.boards$subscription.unsubscribe();
  }
}
