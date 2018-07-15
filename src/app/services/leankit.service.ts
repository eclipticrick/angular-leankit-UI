import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs/internal/ReplaySubject';

// const endpoints = [
//   '/io/auth/token',
//   '/io/board',
//   '/io/board/:id',
//   '/io/board/:boardId/customfield',

//   '/io/card',
//   '/io/card/:id',
//   '/io/card/:cardId/attachment',
//   '/io/card/:cardId/attachment/id/content',
//   '/io/card/:cardId/comment',
//   '/io/card/:cardId/tasks',
//   '/io/card/:cardId/tasks/:id',

//   '/io/template',

//   '/io/user',

//   '/io/user/:id',

//   '/io/user/:id/board/recent', //todo: test

// ];

@Injectable({
  providedIn: 'root'
})
export class LeankitService {
  BASE_URL = 'http://185.224.88.65:1555/api/hu/io/';
  alreadyRetrieved = [];

  constructor(private http: HttpClient) { }

  // getTokens() { return this.get('auth/token'); }
  // getMetaData(): Promise<any> { return this.get('board').pipe(map(data => data['pageMeta'])); }
  // getBoards(): Promise<any> { return this.get('board').pipe(map(data => data['boards'])); }
  // getBoardsCustomfield(boardId: number): Promise<any> { return this.get('board/' + boardId + '/customfield'); }
  // getCardAttachments(cardId: number): Promise<any> { return this.get('card/' + cardId + '/attachment'); }
  // getCardAttachment(cardId: number, attachmentId): Promise<any> { return this.get('card/' + cardId + '/attachment/' + attachmentId + '/content'); }

  getBoards(): Promise<any> {
    return this.get('board')
      .then(x => x['pageMeta'])
      .then(metaData => {
        return this.get('board?limit=' + metaData.totalRecords)
          .then(x => x['boards']);
      });
  }

  getBoard(id: number): Promise<any> {
    return this.get('board/' + id);
  }

  getCards(): Promise<any> {

    // let url = 'card';
    // for (let i = 0; i < arguments.length; i++) {
    //   let symbol = '&';
    //   if (!i) symbol = '?';
    //   url += symbol + arguments[i]['parameter'] + '=' + arguments[i]['value'];
    // }

    return this.get('card')
      .then(x => x['pageMeta'])
      .then(metaData => {
        return this.get('card?limit=' + metaData.totalRecords)
          .then(x => x['cards']);
      });
  }

  getCard(id: number): Promise<any> {
    return this.get('card/' + id);
  }

  getCardTasks(cardId: number): Promise<any> {
    return this.get('card/' + cardId + '/tasks')
      .then(x => x['pageMeta'])
      .then(metaData => {
        return this.get('card/' + cardId + '/tasks?limit=' + metaData.totalRecords)
          .then(x => x['cards']);
      });
  }

  getCardTask(cardId: number, taskId): Promise<any> {
    return this.get('card/' + cardId + '/tasks/' + taskId);
  }

  getCardComments(cardId: number): Promise<any> {
    return this.get('card/' + cardId + '/comment');
  }

  getTemplates(): Promise<any> {
    return this.get('template');
  }

  getUsers(): Promise<any> {
    return this.get('user')
      .then(x => x['pageMeta'])
      .then(metaData => {
        return this.get('user?limit=' + metaData.totalRecords)
          .then(x => x['users']);
      });
  }

  getUser(id: number): Promise<any> {
    return this.get('user/' + id);
  }

  getRecentActivityForUser(id: number): Promise<any> {
    return this.get('user/' + id + '/board/recent');
  }

  private get(path): Promise<any> {
    if (this.alreadyHasDataFrom(path)) {
      return this.getLocallyStoredDataFrom(path);
    } else {
      return this.getApiDataFrom(path);
    }
  }

  private alreadyHasDataFrom(path): boolean {
    return this.alreadyRetrieved.some(x => x.path === path);
  }

  private getLocallyStoredDataFrom(path): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.alreadyRetrieved.filter(data =>  data.path === path)[0]['data']);
    });
  }
  private getApiDataFrom(path): Promise<any> {
    return this.http.get(this.BASE_URL + path).toPromise()
      .then(data => {
        this.alreadyRetrieved.push({ path: path, data: data });
        return data;
      });
  }


  // getTokens() { return this.get('auth/token'); }

  // // getMetaData() { return this.get('board').pipe(map(data => data['pageMeta'])); }

  // // getBoards() { return this.get('board').pipe(map(data => data['boards'])); }
  // getBoards() {
  //   const cardsObservable = new ReplaySubject();
  //   this.get('board')
  //     .pipe(map(x => x['pageMeta']))
  //     .subscribe(metaData  => {
  //       this.get('board?limit=' + metaData.totalRecords)
  //         .pipe(map(x => x['boards']))
  //         .subscribe(boards => cardsObservable.next(boards));
  //     });
  //   return cardsObservable;
  // }
  // getBoard(id: number) { return this.get('board/' + id); }
  // getBoardsCustomfield(boardId: number) {  return this.get('board/' + boardId + '/customfield'); }

  // getCards() {
  //   const cardsObservable = new ReplaySubject();
  //   this.get('card')
  //     .pipe(map(x => x['pageMeta']))
  //     .subscribe(metaData  => {
  //       this.get('card?limit=' + metaData.totalRecords)
  //         .pipe(map(x => x['cards']))
  //         .subscribe(cards => cardsObservable.next(cards));
  //     });
  //   return cardsObservable;
  // }
  // getCard(id: number) {
  //   return this.get('card/' + id);
  // }
  // getCardAttachments(cardId: number) {
  //   return this.get('card/' + cardId + '/attachment');
  // }
  // getCardAttachment(cardId: number, attachmentId) {
  //   return this.get('card/' + cardId + '/attachment/' + attachmentId + '/content');
  // }
  // getCardTasks(cardId: number) {
  //   const cardsObservable = new ReplaySubject();
  //   this.get('card/' + cardId + '/tasks')
  //     .pipe(map(x => x['pageMeta']))
  //     .subscribe(metaData  => {
  //       this.get('card/' + cardId + '/tasks?limit=' + metaData.totalRecords)
  //         .pipe(map(x => x['cards']))
  //         .subscribe(taskCards => cardsObservable.next(taskCards));
  //     });
  //   return cardsObservable;
  // }
  // getCardTask(cardId: number, taskId) {
  //   return this.get('card/' + cardId + '/tasks/' + taskId);
  // }
  // getCardComments(cardId: number) {
  //   return this.get('card/' + cardId + '/comment');
  // }

  // getTemplates() {  return this.get('template'); }

  // getUsers() {  return this.get('user'); }
  // getUser(id: number) { return this.get('user/' + id); }
  // getRecentActivityForUser(id: number) { return this.get('user/' + id + '/board/recent'); }


  // private get(path): Observable<any> {
  //   if (this.alreadyHasDataFrom(path)) {
  //     return this.getLocallyStoredDataFrom(path);
  //   } else {
  //     return this.getApiDataFrom(path);
  //   }
  // }

  // private alreadyHasDataFrom(path): boolean {
  //   return this.alreadyRetrieved.some(x => x.path === path);
  // }

  // private getLocallyStoredDataFrom(path): Observable<any> {
  //   const localData = this.alreadyRetrieved.filter(data =>  data.path === path)[0]['data'];
  //   return new Observable(observer => {
  //     observer.next(localData);
  //     observer.complete();
  //   });
  // }
  // private getApiDataFrom(path): Observable<any> {
  //   const observable = this.http.get(this.BASE_URL + path);
  //   const $ = observable.subscribe(data => {
  //     this.alreadyRetrieved.push({ path: path, data: data });
  //     $.unsubscribe();
  //   });
  //   return observable;
  // }
}
