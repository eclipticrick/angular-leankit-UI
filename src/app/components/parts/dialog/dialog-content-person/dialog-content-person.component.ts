import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-dialog-content-person',
  templateUrl: './dialog-content-person.component.html',
  styleUrls: ['./dialog-content-person.component.scss']
})
export class DialogContentPersonComponent implements OnInit {
  @Input() data: any;
  user;
  avatarSrc;

  constructor(private dataSvc: DataService) {}

  ngOnInit() {
    this.user = this.data.user;
    this.avatarSrc = this.user.avatar.replace('?s=25', '?s=150');
  }

}
