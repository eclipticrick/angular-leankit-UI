import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeankitService {
  BASE_URL = 'http://185.224.88.65:1555/api/hu/io/';
  alreadyRetrieved = [];

  constructor(private http: HttpClient) { }

  getBoards(): Promise<any> {
    return this.get('board')
      .then(data => data['pageMeta'])
      .then(metaData => {
        return this.get('board?limit=' + (metaData.totalRecords > 0 ? metaData.totalRecords : 1))
          .then(data => data['boards']);
      });
  }

  getBoard(id: number): Promise<any> {
    return this.get('board/' + id);
  }

  getCards(): Promise<any> {
    return this.get('card')
      .then(data => data['pageMeta'])
      .then(metaData => {
        return this.get('card?limit=' + (metaData.totalRecords > 0 ? metaData.totalRecords : 1))
          .then(data => data['cards']);
      });
  }

  getChildCardsCount(cardId: number): Promise<any> {
    return this.get('card/' + cardId + '/connection/children')
      .then(data => data['redactedCount']);
  }

  getChildCards(cardId: number): Promise<any> {
    return this.get('card/' + cardId + '/connection/children')
      .then(data => data['pageMeta'])
      .then(metaData => {
        return this.get('card/' + cardId + '/connection/children?limit=' + (metaData.totalRecords > 0 ? metaData.totalRecords : 1))
          .then(data => data['cards']);
      });
  }

  getParentCards(cardId: number): Promise<any> {
    return this.get('card/' + cardId + '/connection/parents')
      .then(data => data['pageMeta'])
      .then(metaData => {
        return this.get('card/' + cardId + '/connection/parents?limit=' + (metaData.totalRecords > 0 ? metaData.totalRecords : 1))
          .then(data => data['cards']);
      });
  }

  getCard(id: number): Promise<any> {
    return this.get('card/' + id);
  }

  getCardTasks(cardId: number): Promise<any> {
    return this.get('card/' + cardId + '/tasks')
      .then(data => data['pageMeta'])
      .then(metaData => {
        return this.get('card/' + cardId + '/tasks?limit=' + (metaData.totalRecords > 0 ? metaData.totalRecords : 1))
          .then(data => data['cards']);
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
      .then(data => data['pageMeta'])
      .then(metaData => {
        return this.get('user?limit=' + (metaData.totalRecords > 0 ? metaData.totalRecords : 1))
          .then(data => data['users']);
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
    return this.alreadyRetrieved.some(data => data.path === path);
  }

  private getLocallyStoredDataFrom(path): Promise<any> {
    return new Promise(resolve => {
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
}
