import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeankitService {
  constructor(private http: HttpClient) { }
  getBoards() {
    return this.get('board');
  }
  private get(path) {
    const url = 'http://185.224.88.65:1555/api/hu/io/' + path;
    return this.http.get(url);
  }

}
