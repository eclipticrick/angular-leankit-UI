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
  tasks;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.tasks = this.data.getCardTasks(this.card.id);
  }

  alert(str) {
    alert(str);
  }

}
