import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { APP_CONFIG } from '../../../app.config';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../../../services/team.service';
import { ContactService } from '../../../services/contact.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  title = 'Loading...';
  closeButtonText = 'Sluiten';
  icon;

  contactForm: FormGroup;
  // email;
  emailCtrl = new FormControl('', [ Validators.required, Validators.email ]);
  // subject;
  subjectCtrl = new FormControl('', [ Validators.required ]);
  // message;
  messageCtrl = new FormControl('', [ Validators.required ]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contactSvc: ContactService,
    public dataSvc: DataService,
    public dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private team: TeamService) {
    this.contactForm = formBuilder.group({
      email: this.emailCtrl,
      subject: this.subjectCtrl,
      message: this.messageCtrl
    });

    if (data.dialogType === 'help') {
      data.questionData = APP_CONFIG.questions[data.questionType];
      if (data.questionData) {
        this.icon = 'help';
        this.title = data.questionType;
        this.closeButtonText = 'Ik snap het!';
      }

    } else if (data.dialogType === 'card') {
      this.icon = 'info';
      this.dataSvc.getCardInfo(data.id).then(card => this.title = card.title);

    } else if (data.dialogType === 'person') {
      this.icon = 'info';

    } else if (data.dialogType === 'contact') {
      this.title = 'Contact';
      this.closeButtonText = 'Annuleren';
      if (data.email) contactSvc.email = data.email;
      if (data.subject) contactSvc.subject = data.subject;
      if (data.message) contactSvc.message = data.message;
    }
  }

  close() {
    this.dialogRef.close();
  }

  onContactFormSubmit() {
    // todo: email messge here!

    console.log('submitted!', this.contactForm);
    console.log('|-- teamsBoardId:', this.team.getSelectedTeam());
    console.log('|-- email (from):', this.contactForm.controls.email.value);
    console.log('|-- subject:', this.contactForm.controls.subject.value);
    console.log('|-- message:', this.contactForm.controls.message.value);
    alert('email messge here! (dialog.component.ts)');
    this.dialogRef.close();
  }

  getContactFormErrorMessage(formCtrl: FormControl) {
    return formCtrl.hasError('required') ? 'Dit veld is verplicht' :
      formCtrl.hasError('email') ? 'Dit is geen geldig e-mailadres' :
        '';
  }
}
