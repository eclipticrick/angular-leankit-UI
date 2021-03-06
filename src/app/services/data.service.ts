import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { LeankitService } from './leankit.service';
import { CardType } from '../enums/CardType.enum';
import { Lane } from '../enums/Lane.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private leankit: LeankitService) { }



  /**
   * Temporary function for this PoC
   *
   * (this method is only called in data.service.ts)
   */
  getReviewDate(boardId: number): Promise<any> {
    return this.leankit.getReviewDate(boardId)
      .then(reviewDate => {
        console.log('reviewDate', reviewDate);
        return reviewDate;
      });
  }



  getConfig() {
    return APP_CONFIG;
  }
  getBoards(): Promise<any> {
    return this.leankit.getBoards()
      .then(boards => this.filterBoardsOnSpecifiedInConfig(boards));
  }

  getBoardInfo(boardId: number): Promise<any> {
    return this.leankit.getBoard(boardId);
  }

  getCards(boardId: number, lane: Lane, type: CardType): Promise<any> {
    boardId = Number(boardId);
    return this.leankit.getCards()
      .then(cards => this.filterCardsOnBoard(boardId, cards))
      .then(cards => this.filterCardsOnExcluded(boardId, cards))
      .then(cards => this.filterCardsOnType(boardId, cards, type))
      .then(cards => {
        if (type === CardType.epic && (lane === Lane.doing || lane === Lane.backlog)) {
          return this.filterEpicCardsOnDoingOrBacklogLane(boardId, cards, lane);
        } else {
          return this.filterCardsOnLane(boardId, cards, lane);
        }
      });
  }

  getCardInfo(cardId: number): Promise<any> {
    return this.leankit.getCard(cardId);
  }

  isRootCard(cardId: number): Promise<boolean> {
    return this.leankit.getCard(cardId).then(cardInfo => !cardInfo.parentCards.length);
  }

  getParentCards(cardId: number): Promise<any> {
    return this.leankit.getParentCards(cardId);
  }

  getChildCards(cardId: number): Promise<any> {
    return this.leankit.getChildCards(cardId);
  }

  getAllChildCards(cardId: number): Promise<any> {
    const promises = [];
    return this.getChildCards(cardId)
      .then(cards => {
        cards.forEach(card => promises.push(this.getAllChildCards(card.id)));
        return Promise.all(promises)
          .then(cardLists => {
          cardLists.forEach(cardList => cards = [ ...cards , ...cardList ]);
          return cards;
        });
      });
  }

  getCardTasks(cardId: number, isDone: boolean = null): Promise<any> {
    return this.leankit.getCardTasks(cardId)
      .then(tasks => {
        if (isDone === null) return tasks;
        else return tasks.filter(task => task.isDone === isDone);
      });
  }

  getCardTaskInfo(cardId: number, taskId: number): Promise<any> {
    return this.leankit.getCardTask(cardId, taskId);
  }

  getAllTasksFromCardAndAllChildCards(cardId: number): Promise<any> {
    const promises = [];
    promises.push(this.getCardTasks(cardId));
    return this.getAllChildCards(cardId).then(cards => {
      cards.forEach(card => {
        promises.push(this.getCardTasks(card.id));
      });
      return Promise.all(promises)
        .then(taskLists => {
          let tasks = [];
          taskLists.forEach(taskList => tasks = [ ...tasks, ...taskList ]);
          return tasks;
        });
    });
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

  private filterCardsOnType(boardId: number, cards: any[], type: CardType) {
    if (type === CardType.epic) {
      return cards.filter(card => APP_CONFIG.boards[boardId].epicCardTypes.includes(Number(card.type.id)));
    } else if (type === CardType.nonEpic) {
      return cards.filter(card => !APP_CONFIG.boards[boardId].epicCardTypes.includes(Number(card.type.id)));
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
  private filterEpicCardsOnDoingOrBacklogLane(boardId: number, cards: any[], lane: Lane) {
    const promises = [];
    cards.forEach(card => {
      const promise = this.getChildCards(card.id)
        .then(childCards => {
          const childCardsInDoing = this.filterCardsOnLane(boardId, childCards, Lane.doing);

          // if a childCard of this epic is in doing
          if (lane === Lane.doing && childCardsInDoing.length) {

            // return the epic (it should also be in the doing lane)
            return card;

            // if a childCard of this epic is NOT in doing
          } else if (lane === Lane.backlog && !childCardsInDoing.length) {

            // return the epic (it should be in the backlog lane)
            return card;
          }
        });
      promises.push(promise);
    });
    return Promise.all(promises)
      .then(filteredCardsWithUndefinedValues => filteredCardsWithUndefinedValues.filter(value => value))
      .then(filteredCards => {

        filteredCards.concat(this.filterCardsOnLane(boardId, cards, lane));

        // remove duplicates
        return filteredCards.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
        });
      });
  }
}
