import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { DialogService } from '../../../../services/dialog.service';

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

  constructor(private dataSvc: DataService, public dialog: DialogService) { }

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
  }
  expandDescription() {
    this.descriptionCollapsed = false;
  }
}
