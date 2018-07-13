import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getTokens() { return this.get('auth/token'); }

  // getMetaData() { return this.get('board').pipe(map(data => data['pageMeta'])); }

  // getBoards() { return this.get('board').pipe(map(data => data['boards'])); }
  getBoards() {
    return this.get('board').pipe(map(boardsWithMetaData => boardsWithMetaData['boards']));
    // boards['pageMeta']
  }
  getBoard(id: number) { return this.get('board/' + id); }
  getBoardsCustomfield(boardId: number) {  return this.get('board/' + boardId + '/customfield'); }

  getCards() {
    return this.get('card/').pipe(map(cardsWithMetaData => cardsWithMetaData['cards']));
    // cards['pageMeta'];
  }
  getCard(id: number) { return this.get('card/' + id); }
  getCardAttachments(cardId: number) {  return this.get('card/' + cardId + '/attachment'); }
  getCardAttachment(cardId: number, attachmentId) {  return this.get('card/' + cardId + '/attachment/' + attachmentId + '/content'); }
  getCardTasks(cardId: number) {  return this.get('card/' + cardId + '/tasks'); }
  getCardTask(cardId: number, taskId) {  return this.get('card/' + cardId + '/tasks/' + taskId); }
  getCardComments(cardId: number) {  return this.get('card/' + cardId + '/comment'); }

  getTemplates() {  return this.get('template'); }

  getUsers() {  return this.get('user'); }
  getUser(id: number) { return this.get('user/' + id); }
  getRecentActivityForUser(id: number) { return this.get('user/' + id + '/board/recent'); }


  private get(path): Observable<any> {
    // console.log(this.alreadyRetrieved);
    if (this.alreadyHasDataFrom(path)) {
      // console.log('Data from local storage', path);
      return this.getLocallyStoredDataFrom(path);
    } else {
      // console.log('Data from api', path);
      return this.getApiDataFrom(path);
    }
  }

  private alreadyHasDataFrom(path): boolean {
    return this.alreadyRetrieved.some(x => x.path === path);
  }

  private getLocallyStoredDataFrom(path): Observable<any> {
    const localData = this.alreadyRetrieved.filter(data =>  data.path === path)[0]['data'];
    return new Observable(observer => {
      observer.next(localData);
      observer.complete();
    });
  }
  private getApiDataFrom(path): Observable<any> {
    const observable = this.http.get(this.BASE_URL + path);
    const $ = observable.subscribe(data => {
      this.alreadyRetrieved.push({ path: path, data: data });
      $.unsubscribe();
    });
    return observable;
  }
}
