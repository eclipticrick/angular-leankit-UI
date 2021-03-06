import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class LeankitService {
  BASE_URL = APP_CONFIG.nodeJsServerUrl;
  alreadyRetrieved = [];

  constructor(private http: HttpClient) { }



  /**
   * Temporary function for this PoC
   *
   * (this method is only called in data.service.ts)
   */
  getReviewDate(boardId: number): Promise<any> {
    return this.get('getNextReview?team=' + boardId);
  }



  getBoards(): Promise<any> {
    return this.getList('board', 'boards');
  }

  getBoard(id: number): Promise<any> {
    return this.get('board/' + id);
  }

  getCards(): Promise<any> {
    return this.getList('card', 'cards');
  }

  getChildCards(cardId: number): Promise<any> {
    return this.getList('card/' + cardId + '/connection/children', 'cards');
  }

  getParentCards(cardId: number): Promise<any> {
    return this.getList('card/' + cardId + '/connection/parents', 'cards');
  }

  getCard(id: number): Promise<any> {
    return this.get('card/' + id);
  }

  getCardTasks(cardId: number): Promise<any> {
    return this.getList('card/' + cardId + '/tasks', 'cards');
  }

  getCardTask(cardId: number, taskId): Promise<any> {
    return this.get('card/' + cardId + '/tasks/' + taskId);
  }

  /**
   * To get a list from the API, multiple requests are needed.
   * This function checks the metaData to see how many requests need to be executed
   * & gets all the data for a specific path. (e.g. '/io/card')
   *
   *
   * @param path                  (e.g. 'card',
   *                                this will get data from /io/card)
   *
   * @param listName              (e.g. 'cards',
   *                                this will get the cards data object from the endpoint
   *                                example data object: { metaData: [...], cards: [...] } )
   *
   * @returns {Promise<any[]>}    (returns a (promise of the) full list   WITHOUT   the metaData)
   */
  getList(path, listName): Promise<any> {

    return this.get(path)
      .then(data => data['pageMeta'])
      .then(metaData => {
        let limit;
        let offset;

        const promises = [];

        if (metaData.totalRecords > 500) {
          for (let requestNr = 1; requestNr <= Math.floor(metaData.totalRecords / 500) + 1; requestNr++) {
            if (requestNr * 500 > metaData.totalRecords) {
              limit = metaData.totalRecords % 500 ? metaData.totalRecords % 500 : 1;
            } else limit = 500;

            offset = (requestNr - 1) * 500;

            promises.push(
              this.get(path + '?limit=' + limit + '&offset=' + offset)
                .then(data => data[listName])
            );
          }
        } else {
          limit = metaData.totalRecords ? metaData.totalRecords : 1;
          promises.push(
            this.get(path + '?limit=' + limit)
              .then(data => data[listName])
          );
        }
        return Promise.all(promises)
          .then(lists => {
            const fullList = [];
            lists.forEach(list => fullList.push(...list));
            return fullList;
          });
      });
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
