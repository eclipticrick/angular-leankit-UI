import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data$ = null;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data$ = this.data.getData();
    this.data$.subscribe(data => {
      console.log('GOT DATA');
      console.log(data);
    });
  }

}
