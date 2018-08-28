import { Injectable } from '@angular/core';
import {DialogService} from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public email = '';
  public subject = '';
  public message = '';

  constructor() { }

}
