import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public email = '';
  public subject = '';
  public message = '';

  constructor() { }

}
