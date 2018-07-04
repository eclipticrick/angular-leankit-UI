import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// const endpoints = [
//   '/io/auth/token',
//   '/io/board',
//   '/io/board/:id',
//   '/io/board/:boardId/customfield',
//   '/io/card/:cardId/attachment',
//   '/io/card/:cardId/attachment/id/content',
//   '/io/card',
//   '/io/card/:id',
//   '/io/card/:cardId/comment',
//   '/io/template',
//   '/io/user',
//   '/io/user/me',
//   '/io/user/:id',
//   '/io/user/me/board/recent',
//   '/io/card/:cardId/tasks',
//   '/io/card/:cardId/tasks/:id',
// ];

@Injectable({
  providedIn: 'root'
})
export class LeankitService {
  BASE_URL = 'http://185.224.88.65:1555/api/hu/io/';
  alreadyRetrieved = [];

  constructor(private http: HttpClient) { }

  getBoards() {
    return this.get('board');
  }

  private get(path): Observable<any> {
    if (this.alreadyHasDataFrom(path)) {
      console.log('Data from local storage', path);
      return this.getLocallyStoredDataFrom(path);
    } else {
      console.log('Data from api', path);
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
    const obs = this.http.get(this.BASE_URL + path);
    obs.subscribe(data => this.alreadyRetrieved.push({ path: path, data: data }));
    return obs;
  }
}
