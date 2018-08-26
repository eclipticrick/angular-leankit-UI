import { Component, Input, OnInit } from '@angular/core';
import { CardType } from '../../../enums/CardType.enum';
import { Lane } from '../../../enums/Lane.enum';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { TeamService } from '../../../services/team.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-card-list-with-container',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  config = this.dataSvc.getConfig();
  @Input() board;
  @Input() type?: CardType;
  @Input() lane?: Lane;
  @Input() pages?: boolean;
  cards;
  cardsLimit;
  cardsOffset;

  constructor(private dataSvc: DataService, private teamSvc: TeamService, private router: Router, public dialog: DialogService) { }

  ngOnInit() {
    this.cardsLimit = 4;
    this.cardsOffset = 0;

    if (!this.pages) this.pages = false;

    this.cards = this.dataSvc.getCards(this.board.id, this.lane ? this.lane : Lane.all, this.type ? this.type : CardType.all);
  }

  navigateToPageAndSelectTeam(page: string, boardId: string) {
    this.teamSvc.setSelectedTeam(boardId);
    this.router.navigate([ page ]);
  }


  onPageChange(pageEvent: any) {
    this.cardsOffset = pageEvent.pageIndex * pageEvent.pageSize;
    this.cardsLimit = pageEvent.pageSize * (pageEvent.pageIndex + 1);
  }

}
