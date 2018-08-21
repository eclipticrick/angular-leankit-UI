import { Component, Input, OnInit } from '@angular/core';
import { CardType } from '../../../enums/CardType.enum';
import { Lane } from '../../../enums/Lane.enum';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { TeamService } from '../../../services/team.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-card-list-with-container',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  config = this.data.getConfig();
  @Input() board;
  @Input() type?: CardType;
  @Input() lane?: Lane;
  @Input() pages?: boolean;
  cards;
  cardsLimit;
  cardsOffset;

  constructor(private data: DataService, private teamSvc: TeamService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.cardsLimit = 4;
    this.cardsOffset = 0;

    if (!this.pages) this.pages = false;

    this.cards = this.data.getCards(this.board.id, this.lane ? this.lane : Lane.all, this.type ? this.type : CardType.all);
    this.cards.then(x => console.log(x));
  }

  navigateToPageAndSelectTeam(page: string, boardId: string) {
    this.teamSvc.setSelectedTeam(boardId);
    this.router.navigate([ page ]);
  }


  onPageChange(pageEvent: any) {
    this.cardsOffset = pageEvent.pageIndex * pageEvent.pageSize;
    this.cardsLimit = pageEvent.pageSize * (pageEvent.pageIndex + 1);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { title: 'some title' };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }
}
