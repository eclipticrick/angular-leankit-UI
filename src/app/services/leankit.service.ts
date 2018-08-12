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
    return this.getList('board', 'boards');
  }

  getBoard(id: number): Promise<any> {
    return this.get('board/' + id);
  }

  getCards(): Promise<any> {
    return this.getList('card', 'cards');
  }

  getChildCardsCount(cardId: number): Promise<any> {
    return this.get('card/' + cardId + '/connection/children')
      .then(data => data['redactedCount']);
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

  getCardComments(cardId: number): Promise<any> {
    return this.get('card/' + cardId + '/comment');
  }

  getTemplates(): Promise<any> {
    return this.get('template');
  }

  getUsers(): Promise<any> {
    return this.getList('user', 'users');
  }

  getUser(id: number): Promise<any> {
    return this.get('user/' + id);
  }

  getRecentActivityForUser(id: number): Promise<any> {
    return this.get('user/' + id + '/board/recent');
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

    // console.log('getList', path, listName)

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
