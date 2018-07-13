import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeankitService } from '../../../services/leankit.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private leankit: LeankitService, public data: DataService) { }
  dataSubscription$;
  ngOnInit() {
    this.data.getData();
    this.dataSubscription$ = this.data.data$.subscribe(data => {
      console.log(data);
    });
    // this.printInfo();
  }

  alert(str) {
    alert(str);
  }

  printInfo() {
    this.leankit.getBoards().subscribe(boards => {
      console.log('boards', boards);
      this.leankit.getBoard(boards['boards'][0].id).subscribe(boardInfo => {
        console.log('--boardInfo', boardInfo);
      });
    });

    this.leankit.getUsers().subscribe(users => {
      console.log('users', users);
      this.leankit.getUser(users['users'][0].id).subscribe(user => {
        console.log('--user', user);
      });
    });

    this.leankit.getCards().subscribe(cards => {
      console.log('cards', cards);
      this.leankit.getCard(cards['cards'][0].id).subscribe(cardInfo => {
        console.log('--cardInfo', cardInfo);
      });

      this.leankit.getCardAttachments(cards['cards'][0].id).subscribe(cardAttachments => {
        console.log('----cardAttachments', cardAttachments);
        this.leankit.getCardAttachment(cards['cards'][0].id, cardAttachments.id).subscribe(cardAttachmentInfo => {
          console.log('------cardAttachmentInfo', cardAttachmentInfo);
        });
      });

      this.leankit.getCardTasks(cards['cards'][0].id).subscribe(cardTasks => {
        console.log('----cardTasks', cardTasks);
        this.leankit.getCardTask(cards['cards'][0].id, cardTasks.id).subscribe(cardTaskInfo => {
          console.log('------cardTaskInfo', cardTaskInfo);
        });
      });

      this.leankit.getCardComments(cards['cards'][0].id).subscribe(cardComments => {
        console.log('----cardComments', cardComments);
      });
    });
  }

  ngOnDestroy() {
    if (this.dataSubscription$) this.dataSubscription$.unsubscribe();
  }
}
