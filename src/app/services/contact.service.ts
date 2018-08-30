import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeankitService } from './leankit.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  CONTACT_URL = this.leankitSvc.BASE_URL.slice(0, this.leankitSvc.BASE_URL.length - 1) + '/contact';

  public email = '';
  public subject = '';
  public message = '';

  constructor(private http: HttpClient, private leankitSvc: LeankitService) { }

  sendContactMail(teamsBoardId: string, email: string, subject: string, message: string) {
    return this.http.post<any>(this.CONTACT_URL, {
      team: teamsBoardId,
      email: email,
      subject: subject,
      message: message
    });
  }
}
