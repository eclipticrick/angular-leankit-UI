import {Component, Input, OnInit} from '@angular/core';
import {CardType} from '../../../enums/CardType.enum';
import {Lane} from '../../../enums/Lane.enum';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input() boardId: number;
  @Input() layout: string;
  @Input() type?: CardType;
  @Input() lane?: Lane;
  @Input() limitAmount?: number;
  cards;
  constructor(private data: DataService) { }

  ngOnInit() {
    if (!this.layout) this.layout = 'row';
    // console.log(
    //   'boardId',
    //   this.boardId,
    //   'type',
    //   this.type,
    //   'lane',
    //   this.lane,
    //   'layout',
    //   this.layout,
    // );
    this.cards = this.data.getCards(this.boardId, this.lane ? this.lane : Lane.all, this.type ? this.type : CardType.all);
      // .then(x => {
      //   // console.log(x);
      //   return x;
      // });
  }

}
