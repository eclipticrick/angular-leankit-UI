import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CardType } from '../../../enums/CardType.enum';
import { Lane } from '../../../enums/Lane.enum';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnDestroy {
  @Input() boardId: number;
  @Input() layout: string;
  @Input() type?: CardType;
  @Input() lane?: Lane;
  @Input() limitAmount?: number;
  cards;
  constructor(private data: DataService) { }

  ngOnInit() {
    if (!this.layout) this.layout = 'row';

    this.cards = this.data.getCards(this.boardId, this.lane ? this.lane : Lane.all, this.type ? this.type : CardType.all);

    if (!this.limitAmount) {
      this.limitAmount = 0;
      this.cards.then(cards => this.limitAmount = cards.length);
    }
  }
  ngOnDestroy() {}

}
