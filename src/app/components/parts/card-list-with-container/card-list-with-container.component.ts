import { Component, Input, OnInit } from '@angular/core';
import { CardType } from '../../../enums/CardType.enum';
import { Lane } from '../../../enums/Lane.enum';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-card-list-with-container',
  templateUrl: './card-list-with-container.component.html',
  styleUrls: ['./card-list-with-container.component.scss']
})
export class CardListWithContainerComponent implements OnInit {
  config = this.data.getConfig();
  @Input() board;
  @Input() type?: CardType;
  @Input() lane?: Lane;
  @Input() limitAmount?: number;
  constructor(private data: DataService) { }

  ngOnInit() {
  }

}
