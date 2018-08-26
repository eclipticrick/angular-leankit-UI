import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-dialog-content-card',
  templateUrl: './dialog-content-card.component.html',
  styleUrls: ['./dialog-content-card.component.scss']
})
export class DialogContentCardComponent implements OnInit {
  @Input() data: any;

  config = this.dataSvc.getConfig();

  boardId: number;

  cardId: number;
  card;
  parentCards;
  childCards;
  allChildCards;
  tasks;
  allTasksFromCardAndAllChildCards;

  descriptionCollapsed = true;

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
    this.cardId = Number(this.data.id);
    this.card = this.dataSvc.getCardInfo(this.cardId);
    this.parentCards = this.dataSvc.getParentCards(this.cardId)
      .then(parentCards => {
        const promises = [];
        parentCards
          .forEach(parentCard => promises.push(this.dataSvc.getCardInfo(parentCard.id)));
        return Promise.all(promises)
          .then(fullParentCards => Array.prototype.concat.apply([], fullParentCards));
      });
    this.childCards = this.dataSvc.getChildCards(this.cardId);
    this.allChildCards = this.dataSvc.getAllChildCards(this.cardId);
    this.tasks = this.dataSvc.getCardTasks(this.cardId);
    this.allTasksFromCardAndAllChildCards = this.dataSvc.getAllTasksFromCardAndAllChildCards(this.cardId);

    this.card.then(card => this.boardId = card.board.id);

    // todo:  foreach task:
    //        this.dataSvc.getCardTaskInfo(this.cardId);

    console.log('=======================' + this.cardId + '===========================');
    this.card
      .then(x => console.log('==> card', x))  ;
    this.parentCards
      .then(x => console.log('==> parentCards', x));
    this.childCards
      .then(x => console.log('==> childCards', x));
    this.allChildCards
      .then(x => console.log('==> allChildCards', x));
    this.tasks
      .then(x => console.log('==> tasks', x));
    this.allTasksFromCardAndAllChildCards
      .then(x => console.log('==> allTasksFromCardAndAllChildCards', x));
    setTimeout(console.log, 1500, '===========================================================\n');
  }
  expandDescription() {
    this.descriptionCollapsed = false;
  }
}
