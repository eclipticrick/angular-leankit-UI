import { Injectable } from '@angular/core';
import { DialogComponent } from '../components/parts/dialog/dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  showDialog(dialogType: string, data: any) {
    this.openDialog({
      dialogType: dialogType,
      ...data
    });
  }

  private openDialog(dialogData: any) {
    const dialogConfig = new MatDialogConfig();
    if (dialogData) dialogConfig.data = dialogData;
    return this.dialog.open(DialogComponent, dialogConfig);
  }
}
