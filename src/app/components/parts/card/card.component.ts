import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() layout: string;
  @Input() card: any;

  tasks: Promise<any>;
  childCards: Promise<any>;
  allChildCards: Promise<any>;

  tasksIsDoneCount: number;

  lastActivity: Date;

  constructor(private data: DataService) { }

  ngOnInit() {

    this.tasks = this.data.getAllTasksFromCardAndAllChildCards(this.card.id)
      .then(tasks => {
        this.tasksIsDoneCount = tasks.reduce((count, task) => count + task.isDone, 0);
        return tasks;
      });
    this.childCards = this.data.getChildCards(this.card.id);
    this.allChildCards = this.data.getAllChildCards(this.card.id)
      .then(allChildCards => this.setLastActivity(allChildCards));

  }

  private setLastActivity(cardList: any[]) {
    this.setLastActivityIfNessecary(new Date(this.card.updatedOn));
    cardList.forEach(card => this.setLastActivityIfNessecary(new Date(card.updatedOn)));
    return cardList;
  }

  private setLastActivityIfNessecary(lastCardActivity: Date) {
    if (!this.lastActivity) {
      this.lastActivity = lastCardActivity;
    } else if (this.lastActivity.getTime() < lastCardActivity.getTime()) {
      this.lastActivity = lastCardActivity;
    }
  }

  alert(str) {
    alert(str);
  }

}
