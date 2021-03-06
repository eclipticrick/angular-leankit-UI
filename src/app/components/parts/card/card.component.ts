import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  /**
   * This component expect a FULL card
   *
   * meaning: when you get a card list from the leankit API (  dataSvc.getCards(boardId)  )
   *          you get a list of cards   without   all the information
   *          you then have to get the card info to get the FULL card object
   *          this is done by calling the (  dataService.getCardInfo(cardId)  )
   *          the card returned from this can be used as input for this component
   * */
  @Input() card: any;

  @Input() extraInfo?: any;

  tasks: Promise<any>;
  childCards: Promise<any>;
  allChildCards: Promise<any>;

  tasksCount: number;
  tasksIsDoneCount: number;
  cardsCount: number;
  cardsIsDoneCount: number;
  progress: number;

  lastActivity: Date;

  tooltipStoriesHelp = 'Wat word hiermee bedoeld?';
  tooltipCardInfo = 'Meer informatie over deze Epic';
  tooltipProgress = 'Loading...';
  tooltipCard = 'Loading...';
  tooltipStories = 'Loading...';
  tooltipTasks = 'Loading...';

  constructor(private dataSvc: DataService, public dialog: DialogService) { }

  ngOnInit() {
    this.tasks = this.dataSvc.getAllTasksFromCardAndAllChildCards(this.card.id)
      .then(tasks => this.setTaskIsDoneCount(tasks));

    this.childCards = this.dataSvc.getChildCards(this.card.id);

    this.allChildCards = this.dataSvc.getAllChildCards(this.card.id)
      .then(allChildCards => this.setLastActivity(allChildCards))
      .then(allChildCards => this.setCardIsDoneCount(allChildCards));

    Promise.all([
      this.tasks,
      this.childCards,
      this.allChildCards
    ])
      .then(() => this.setTooltipStories())
      .then(() => this.setTooltipTasks())
      .then(() => this.calculateProgress())
      .then(() => this.setTooltipProgress())
      .then(() => this.setTooltipCard());
  }

  private setTaskIsDoneCount(allTasks: any[]) {
    this.tasksCount = allTasks.length;
    this.tasksIsDoneCount = allTasks.reduce((count, task) => count + task.isDone, 0);
    return allTasks;
  }

  private setLastActivity(allChildCards: any[]) {
    this.setLastActivityIfNessecary(new Date(this.card.updatedOn));
    allChildCards.forEach(card => this.setLastActivityIfNessecary(new Date(card.updatedOn)));
    return allChildCards;
  }

  private setCardIsDoneCount(allChildCards: any[]) {
    this.cardsCount = allChildCards.length;
    this.cardsIsDoneCount = allChildCards.reduce((count, card) => count + card.isDone, 0);
    return allChildCards;
  }

  private setLastActivityIfNessecary(lastCardActivity: Date) {
    if (!this.lastActivity) {
      this.lastActivity = lastCardActivity;
    } else if (this.lastActivity.getTime() < lastCardActivity.getTime()) {
      this.lastActivity = lastCardActivity;
    }
  }

  private setTooltipCard() {
    this.allChildCards.then(allChildCards => {
      if (this.progress === null) {
        this.tooltipCard = 'Er zijn geen onderliggende stories';
      } else if (this.cardsIsDoneCount && this.cardsIsDoneCount === allChildCards.length) {
        this.tooltipCard = 'Alle onderliggende stories zijn afgerond';
      } else if (this.cardsIsDoneCount) {
        this.tooltipCard = this.cardsIsDoneCount + ' van de ' + allChildCards.length + ' stories zijn afgerond';
      } else {
        this.tooltipCard = 'Er zijn nog geen stories afgerond';
      }
    });
  }

  private setTooltipStories() {
    this.allChildCards.then(allChildCards => {
      this.childCards.then(childCards => {

        const hasSubStories: boolean = (allChildCards.length - childCards.length) > 0;
        const plurialVerb: boolean = allChildCards.length !== 1;

        this.tooltipStories =
          'Deze epic heeft ' + allChildCards.length + ' onderliggende ' +
          (plurialVerb ? 'stories' : 'story') +
          (hasSubStories ? ', waarvan er ' + childCards.length + ' direct verbonden zijn' : '');
      });
    });
  }

  private setTooltipTasks() {
    this.tasks.then(tasks => {
      const keyword = tasks.length === 1 ? 'taak is' : 'taken zijn';
      this.tooltipTasks = this.tasksIsDoneCount + ' van de ' + tasks.length + ' ' + keyword + ' gedaan';
    });
  }

  private calculateProgress() {
    const total = this.cardsCount + this.tasksCount;
    const amountDone = this.cardsIsDoneCount + this.tasksIsDoneCount;
    if (!isNaN(amountDone / total)) this.progress = (amountDone / total) * 100;
    else this.progress = null;
  }

  private setTooltipProgress() {
    this.tooltipProgress = Math.floor(this.progress) + '% van de taken & stories zijn gedaan';
  }

}
