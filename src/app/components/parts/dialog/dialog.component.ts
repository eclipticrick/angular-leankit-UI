import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { APP_CONFIG } from '../../../app.config';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  title = 'Loading...';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogComponent>) {

    if (data.dialogType === 'help') {
      data.questionData = APP_CONFIG.questions.filter(question => question.key === data.questionType)[0];
      if (data.questionData) {
        this.title = data.questionData.question;
      }

    } else if (data.dialogType === 'card') {
      // data.id;

    } else if (data.dialogType === 'person') {
      // data.id;

    } else if (data.dialogType === 'contact') {
      this.title = 'Contact';

    }
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close();
  }

}
