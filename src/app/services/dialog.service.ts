import { Injectable } from '@angular/core';
import { Dialog } from '../enums/Dialog.enum';
import { DialogComponent } from '../components/parts/dialog/dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  showDialog(dialogType: string, data: any) {
    const dialogData = {
      dialogType: dialogType,
      ...data,
      closeButtonText: 'Sluiten'
    };
    if (dialogType === Dialog.help) dialogData.closeButtonText = 'Ik snap het!';
    if (dialogType === Dialog.contact) dialogData.closeButtonText = 'Annuleren!';

    this.openDialog(dialogData);
  }

  openDialog(dialogData: any) {
    const dialogConfig = new MatDialogConfig();
    if (dialogData) dialogConfig.data = dialogData;
    return this.dialog.open(DialogComponent, dialogConfig);
  }
}
