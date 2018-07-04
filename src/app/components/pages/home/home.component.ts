import { Component, OnInit } from '@angular/core';
import { LeankitService } from '../../../services/leankit.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data$ = null;
  constructor(private leankit: LeankitService) { }

  ngOnInit() {
    this.data$ = this.leankit.getBoards().pipe(map(data => data['boards']));
    this.data$.subscribe(boards => {
      console.log(boards);
    });
  }

}
