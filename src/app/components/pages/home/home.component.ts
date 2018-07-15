import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeankitService } from '../../../services/leankit.service';
import { DataService } from '../../../services/data.service';
import { CardType } from '../../../enums/CardType.enum';
import { Lane } from '../../../enums/Lane.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  boards;

  constructor(private leankit: LeankitService, private data: DataService) { }

  ngOnInit() {
    this.boards = this.data.getBoards();
    // this.printDataInfo();
    // this.printLeankitInfo();
  }

  printDataInfo() {
    this.data.getBoards().then(boards => {
      console.log('boards', boards);
      console.log('board', boards[1]);
      this.data.getCards(boards[1].id, Lane.all, CardType.epic)
        .then(cards => {
          cards.forEach(card => {
            this.data.getCardInfo(card.id)
              .then(cardInfo => {
                console.log('cardInfo', cardInfo);
              });
            this.data.getCardTasks(card.id)
              .then(tasks => {
                console.log('getCardTasks(', card.id, ')', tasks);
                tasks.forEach(task => {
                  this.data.getCardTaskInfo(card.id, task.id)
                    .then(taskInfo => {
                      console.log('getCardTaskInfo(', card.id, ', ', task.id, ')', taskInfo);
                    });
                });

              });
            this.data.getChildCards(card.id)
              .then(childCards => {
                console.log('getChildCards(', card.id, ')', childCards);
              });
          });
        });
    });
  }
  printLeankitInfo() {
    let boardInfoCount = 0;
    this.leankit.getBoards().then(boards => {
      console.log('boards', boards);
      boards.forEach(board => {
        if (!boardInfoCount) {
          this.leankit.getBoard(board.id)
            .then(boardInfo => {
              console.log('boardInfo', boardInfo);
            });
        }
        boardInfoCount++;
      });
    });

    let userInfoCount = 0;
    this.leankit.getUsers().then(users => {
      console.log('users', users);
      users.forEach(user => {
        if (!userInfoCount) {
          this.leankit.getUser(user.id)
            .then(userInfo => {
              console.log('userInfo', userInfo);
            });
        }
        userInfoCount++;
      });
    });

    let cardInfoCount = 0;
    let cardTasksCount = 0;
    this.leankit.getCards().then(cards => {
      console.log('cards', cards);
      cards.forEach(card => {
        if (!cardInfoCount) {
          this.leankit.getCard(card.id)
            .then(cardInfo => {
              console.log('cardInfo', cardInfo);
            });
          this.leankit.getCardComments(card.id)
            .then(cardComments => {
              console.log('cardComments', cardComments);
            });
          this.leankit.getCardTasks(card.id)
            .then(cardTasks => {
              console.log('cardTasks', cardTasks);
              cardTasks.forEach(cardTask => {
                if (!cardInfoCount) {
                  this.leankit.getCardTask(card.id, cardTask.id)
                    .then(cardTaskInfo => {
                      console.log('cardTaskInfo', cardTaskInfo);
                    });
                }
                cardTasksCount++;
              });
            });
        }
        cardInfoCount++;
      });
    });
    // this.leankit.getBoards().subscribe(boards => {
    //   console.log('boards', boards);
    //   this.leankit.getBoard(boards['boards'][0].id).subscribe(boardInfo => {
    //     console.log('--boardInfo', boardInfo);
    //   });
    // });

    // this.leankit.getUsers().subscribe(users => {
    //   console.log('users', users);
    //   this.leankit.getUser(users['users'][0].id).subscribe(user => {
    //     console.log('--user', user);
    //   });
    // });

    // this.leankit.getCards().subscribe(cards => {
    //   console.log('cards', cards);
    //   this.leankit.getCard(cards['cards'][0].id).subscribe(cardInfo => {
    //     console.log('--cardInfo', cardInfo);
    //   });

    //   this.leankit.getCardAttachments(cards['cards'][0].id).subscribe(cardAttachments => {
    //     console.log('----cardAttachments', cardAttachments);
    //     this.leankit.getCardAttachment(cards['cards'][0].id, cardAttachments.id).subscribe(cardAttachmentInfo => {
    //       console.log('------cardAttachmentInfo', cardAttachmentInfo);
    //     });
    //   });

    //   this.leankit.getCardTasks(cards['cards'][0].id).subscribe(cardTasks => {
    //     console.log('----cardTasks', cardTasks);
    //     this.leankit.getCardTask(cards['cards'][0].id, cardTasks[0].id).subscribe(cardTaskInfo => {
    //       console.log('------cardTaskInfo', cardTaskInfo);
    //     });
    //   });

    //   this.leankit.getCardComments(cards['cards'][0].id).subscribe(cardComments => {
    //     console.log('----cardComments', cardComments);
    //   });
    // });
  }

  ngOnDestroy() {
    // if (this.dataSubscription$) this.dataSubscription$.unsubscribe();
  }
}
