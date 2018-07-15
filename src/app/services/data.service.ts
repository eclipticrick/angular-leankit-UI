import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { BehaviorSubject, Observable, ReplaySubject, Subject, combineLatest } from 'rxjs';
import { LeankitService } from './leankit.service';
import { CardType } from '../enums/CardType.enum';
import { Lane } from '../enums/Lane.enum';




@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private localStorage = {};
  // private _data: Subject<any> = new ReplaySubject();
  // public readonly data$: Observable<any> = this._data.asObservable();

  constructor(private leankit: LeankitService) { }

  getBoards() {
    return this.leankit.getBoards()
      .then(boards => this.filterBoardsOnSpecifiedInConfig(boards));
  }

  getBoardInfo(boardId: number) {
    return this.leankit.getBoard(boardId);
  }

  getCards(boardId: number, lane: Lane, type?: CardType) {
    boardId = Number(boardId);
    return this.leankit.getCards()
      .then(cards => this.filterCardsOnBoard(boardId, cards))
      .then(cards => this.filterCardsOnExcluded(boardId, cards))
      .then(cards => this.filterCardsOnType(boardId, cards, type))
      .then(cards => this.filterCardsOnLane(boardId, cards, lane));
  }

  private filterBoardsOnSpecifiedInConfig(boards: any[]) {
    return boards.filter(board => {
      return APP_CONFIG.boards[board.id];
    });
  }

  private filterCardsOnBoard(boardId: number, cards: any[]) {
    return cards.filter(card => Number(card.board.id) === boardId);
  }

  private filterCardsOnExcluded(boardId: number, cards: any[]) {
    return cards.filter(card => {
      for (let i = 0; i < APP_CONFIG.boards[boardId].excludedCards.length; i++) {
        if (APP_CONFIG.boards[boardId].excludedCards[i] === Number(card.id)) return false;
      }
      return true;
    });
  }

  private filterCardsOnType(boardId: number, cards: any[], type?: CardType) {
    if (type === CardType.epic) {
      return cards.filter(card => APP_CONFIG.boards[boardId].epicCardType === Number(card.type.id));
    } else if (type === CardType.nonEpic) {
      return cards.filter(card => APP_CONFIG.boards[boardId].epicCardType !== Number(card.type.id));
    } else if (type === CardType.all) {
      return cards;
    }
  }

  private filterCardsOnLane(boardId: number, cards: any[], lane: Lane) {
    const includedLanes = APP_CONFIG.boards[boardId].includedLanes;
    if (lane === Lane.backlog || lane === Lane.doing) {
      return cards.filter(card => {
        for (let i = 0; i < includedLanes[lane].length; i++) {
          if (includedLanes[lane][i] === Number(card.lane.id)) return true;
        }
        return false;
      });
    } else if (lane === Lane.all) {
      return cards;
    }
  }

  // getData() {
  //   this.addBoardsWithInfo().then(() => {
  //     this._data.next(this.localStorage);
  //     this.addCards().then(() => {
  //       this._data.next(this.localStorage);
  //       // this.addUserInformation().then(() => this._data.next(this.localStorage));
  //     });
  //   });
  //   return this.data$;
  // }

  // private addBoardsWithInfo(): Promise<any> {
  //   return new Promise((resolve) => {

  //     // count all retrieved data from boards
  //     const dataCounterObservable: BehaviorSubject<number> = new BehaviorSubject(0);

  //     if (!this.localStorage['$boards']) {

  //       // get all boards
  //       this.leankit.getBoards().subscribe((boards: any[]) => {
  //         const boardsToAdd = [];

  //         // get configuration of the needed boards
  //         APP_CONFIG['boards'].forEach(boardConfig => {

  //           // foreach board (from API)
  //           boards.forEach(board => {
  //             console.log(board)
  //             // check if this board is needed in the app
  //             if (Number(board['id']) === boardConfig['boardId']) {

  //               // add the config
  //               board['$config'] = boardConfig;

  //               // get the info for that board
  //               this.leankit.getBoard(board['id']).subscribe(boardInfo => {
  //                 board['$info'] = boardInfo;
  //                 boardsToAdd.push(board);

  //                 // add board to local storage
  //                 this.localStorage['$boards'] = boardsToAdd;

  //                 // up the counter
  //                 dataCounterObservable.next(dataCounterObservable.getValue() + 1);
  //               });
  //             }
  //           });
  //         });

  //       });
  //     } else dataCounterObservable.next(APP_CONFIG['boards'].length);

  //     // when counter reaches the length of the boards-list in config, then all data is retrieved
  //     dataCounterObservable.subscribe(counter => {
  //       if (counter === APP_CONFIG['boards'].length) {
  //         resolve();
  //       }
  //     });
  //   });
  // }

  // private addCards(): Promise<any> {
  //   return new Promise((resolve) => {
  //     if (this.localStorage['$boards'].length) {
  //       for (let i = 0; i < this.localStorage['$boards'].length; i++) {
  //         if (!this.localStorage['$boards'][i]['$cards']) {
  //           this.leankit.getCards().subscribe((cards: any[]) => {

  //             // create a place in storage for all the cards that should be shown
  //             this.localStorage['$boards'][i]['$cards'] = [];

  //             // foreach board
  //             APP_CONFIG['boards'].forEach(boardConfig => {

  //               // foreach card
  //               cards.forEach(card => {

  //                 // let it not be excluded by default
  //                 let excludedCard = false;

  //                 // if the card does not belong to that board, exclude it
  //                 if (boardConfig['boardId'] !== Number(card['board']['id'])) excludedCard = true;

  //                 // foreach cardType that should be excluded
  //                 boardConfig['excludedCardTypes'].forEach(exludedCardType => {

  //                   // check if the current card is of a type that should be excluded
  //                   if (Number(card['type']['id']) === exludedCardType) excludedCard = true;
  //                 });

  //                 // check if the lane is excluded, if so, exclude the card
  //                 if (!this.isLaneIncluded(i, card['lane']['id'].toString())) excludedCard = true;

  //                 if (excludedCard) return;

  //                 if (boardConfig['epicCardType'] === Number(card.type.id)) card['$isEpic'] = true;

  //                 combineLatest(this.leankit.getCardComments(card.id), this.leankit.getCardTasks(card.id)).subscribe(data => {
  //                   card['$comments'] = data[0];
  //                   card['$tasks'] = data[1];
  //                   if (!excludedCard) this.localStorage['$boards'][i]['$cards'].push(card);
  //                   // card['$tasks'].forEach(task => {
  //                   //   this.leankit.getCardTask(card.id, task.id).subscribe(taskInfo => {
  //                   //     this.localStorage['$boards'][i]['$cards']['$tasks']
  //                   //   });
  //                   // });
  //                 });
  //               });
  //             });
  //           });
  //         }
  //       }
  //       resolve();
  //     } else throw new Error('You must specify at least one valid board in \'app.config.ts\' (make sure the board ID is correct)');
  //   });
  // }

  // private isLaneIncluded(boardIndex: number, laneId: string): boolean {

  //   // if lanes have not been added yet, addLanes()
  //   if (!this.localStorage['$boards'][boardIndex]['$includedLanes']) {
  //     this.addLanes(boardIndex);
  //   }

  //   // after.. check if the lane is included of not
  //   for (const link in this.localStorage['$boards'][boardIndex]['$includedLanes']) {
  //     if (this.localStorage['$boards'][boardIndex]['$includedLanes'].hasOwnProperty(link)) {
  //       for (const includedLane of this.localStorage['$boards'][boardIndex]['$includedLanes'][link]) {
  //         if (includedLane === Number(laneId)) return true;
  //       }
  //     }
  //   }
  //   return false;
  // }

  // private addLanes(boardIndex: number) {
  //   let laneHierarchie = {};

  //   // create the hierarchie of all the lanes of a specific board
  //   this.localStorage['$boards'][boardIndex]['$info']['lanes'].forEach(lane => {
  //     const laneAndAllParentLanesIds = this.getAllParentLanes(boardIndex, lane);
  //     laneHierarchie = this.createLaneHierarchieStructure(laneAndAllParentLanesIds, laneHierarchie);
  //   });

  //   // create a place in storage to track which lanes are included
  //   this.localStorage['$boards'][boardIndex]['$includedLanes'] = {};

  //   // track which lanes are excluded/included
  //   this.checkForAllLanesIfTheyMustBeisLaneIncluded(boardIndex, Number(this.localStorage['$boards'][boardIndex]['id']), laneHierarchie);
  // }

  // private getAllParentLanes(boardIndex: number, lane: string, lanes: any[] = []) {
  //   lanes.unshift(Number(lane['id']));
  //   const parentLane = this.localStorage['$boards'][boardIndex]['$info']['lanes'].filter(x => x['id'] === lane['parentLaneId'])[0];
  //   if (parentLane) this.getAllParentLanes(boardIndex, parentLane, lanes);
  //   return lanes;
  // }

  // private createLaneHierarchieStructure(laneAndAllParentLanesIds: any[], currentHierarchie) {
  //   laneAndAllParentLanesIds.reduce((o, key) => o[key] = o[key] || {}, currentHierarchie);
  //   return currentHierarchie;
  // }

  // private checkForAllLanesIfTheyMustBeisLaneIncluded(
  //   boardIndex,
  //   boardId: number,
  //   laneHierarchie,
  //   parentIsIncludedLink: string = null,
  //   isRoot: boolean = true
  // ) {

  //   // for each (root) lane in this object
  //   for (const laneIdString in laneHierarchie) {
  //     if (laneHierarchie.hasOwnProperty(laneIdString)) {
  //       const laneId = Number(laneIdString);

  //       // find the board
  //       APP_CONFIG.boards.forEach(boardConfig => {

  //         // with the same id as the current boardId
  //         if (boardConfig.boardId === boardId) {

  //           // id the current Lane is a root-lane
  //           if (isRoot) {

  //             // remove parentIsIncludedLink for the next recursion
  //             parentIsIncludedLink = null;
  //           }

  //           // forEach lane config
  //           boardConfig.lanes.forEach(laneConfig => {

  //             // don't include it by default
  //             let included = false;

  //             // generate a place to store the included lanes for this link (e.g. 'backlog')
  //             if (!this.localStorage['$boards'][boardIndex]['$includedLanes'][laneConfig.link]) {
  //               this.localStorage['$boards'][boardIndex]['$includedLanes'][laneConfig.link] = [];
  //             }

  //             // check if parentLane is included, and change the default included value to true
  //             // (will be changed to false if this child lane is excluded)
  //             if (parentIsIncludedLink !== null) {
  //               if (laneConfig.link === parentIsIncludedLink) {
  //                 included = true;
  //               }
  //             }

  //             // for each lane that must be included
  //             laneConfig.include.forEach(includedLaneId => {

  //               // if the lane is the same as the one being checked
  //               if (includedLaneId === laneId) {

  //                 // include it
  //                 included = true;

  //                 // set parentIsIncludedLink for the next recursion
  //                 parentIsIncludedLink = laneConfig.link;
  //               }
  //             });

  //             // for each lane that must be excluded
  //             laneConfig.exclude.forEach(excludedLaneId => {

  //               // if the lane is the same as the one being checked
  //               if (excludedLaneId === laneId) {

  //                 // exclude it
  //                 included = false;

  //                 // remove parentIsIncludedLink for the next recursion
  //                 parentIsIncludedLink = null;
  //               }
  //             });

  //             // if the lane should be included
  //             if (included) {

  //               // make sure that it's not already in the list (shouldn't happen unless this function is called twice)
  //               if (this.localStorage['$boards'][boardIndex]['$includedLanes'][laneConfig.link].indexOf(laneId) === -1) {

  //                 // add lane to the included list for that link
  //                 this.localStorage['$boards'][boardIndex]['$includedLanes'][laneConfig.link].push(laneId);
  //               }
  //             }
  //           });

  //           // figure out if this lane has child lanes
  //           const hasChildLanes: boolean = !(
  //             Object.keys(laneHierarchie[laneId]).length === 0 && laneHierarchie[laneId].constructor === Object
  //           );

  //           // if so
  //           if (hasChildLanes) {

  //             // call this function again for each key in the object
  //             for (const key in laneHierarchie[laneId]) {
  //               if (laneHierarchie[laneId].hasOwnProperty(key)) {
  //                 const newobj = {};
  //                 newobj[key] = laneHierarchie[laneId][key];
  //                 this.checkForAllLanesIfTheyMustBeisLaneIncluded(boardIndex, boardId, newobj, parentIsIncludedLink, false);
  //               }
  //             }
  //           }
  //         }
  //       });
  //     }
  //   }
  // }

  // private addUserInformation(): Promise<any> {
  //   return new Promise((resolve) => {
  //     resolve();
  //   });
  // }

  // getMessages(code, type) {
  //   console.log('getMessage()', code, type);
  //   if (code === 204) code = 'emptyData';
  //   if (code === 404) code = 'notFound';
  //   if (code.isNumber()) return 'ERROR GETTING MESSAGE';


  //   else return APP_CONFIG['messages'][code][type];
  // }

  // /** ***********************************************/
  // /**                     TEMP                     **/
  // /** ***********************************************/
  // calculateMemorySizeOfLocalStorage() {
  //   let bytes = 0;
  //   function sizeOf(obj) {
  //     if (obj !== null && obj !== undefined) {
  //       switch (typeof obj) {
  //         case 'number':
  //           bytes += 8;
  //           break;
  //         case 'string':
  //           bytes += obj.length * 2;
  //           break;
  //         case 'boolean':
  //           bytes += 4;
  //           break;
  //         case 'object':
  //           const objClass = Object.prototype.toString.call(obj).slice(8, -1);
  //           if (objClass === 'Object' || objClass === 'Array') {
  //             for (const key in obj) {
  //               if (!obj.hasOwnProperty(key)) continue;
  //               sizeOf(obj[key]);
  //             }
  //           } else bytes += obj.toString().length * 2;
  //           break;
  //       }
  //     }
  //     return bytes;
  //   }
  //   function formatByteSize(b) {
  //     if (b < 1024) return b + ' Bytes';
  //     else if (b < 1048576) return(b / 1024).toFixed(3) + ' KiB';
  //     else if (b < 1073741824) return(b / 1048576).toFixed(3) + ' MiB';
  //     else return(b / 1073741824).toFixed(3) + ' GiB';
  //   }
  //   return formatByteSize(sizeOf(this.localStorage));
  // }

}
