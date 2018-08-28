import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-content-person',
  templateUrl: './dialog-content-person.component.html',
  styleUrls: ['./dialog-content-person.component.scss']
})
export class DialogContentPersonComponent implements OnInit {
  @Input() data: any;
  user;
  avatarSrc;

  constructor() { }

  ngOnInit() {
    this.user = this.data.user;

    // get the larger image (150x150)
    this.avatarSrc = this.user.avatar.replace('?s=25', '?s=150');
  }

}
