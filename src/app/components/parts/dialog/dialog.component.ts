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

  config = this.dataSvc.getConfig();

  contactForm: FormGroup;
  emailCtrl = new FormControl('', [ Validators.required, Validators.email ]);
  subjectCtrl = new FormControl('', [ Validators.required ]);
  messageCtrl = new FormControl('', [ Validators.required ]);
  formWasSubmitted;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contactSvc: ContactService,
    public dataSvc: DataService,
    public dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private team: TeamService) {

    this.formWasSubmitted = false;

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
      this.title = this.data.user.fullName;

    } else if (data.dialogType === 'contact') {
      this.title = 'Contact';
      this.closeButtonText = 'Annuleren';
      if (data.team) team.setSelectedTeam(data.team);
      if (data.email) contactSvc.email = data.email;
      if (data.subject) contactSvc.subject = data.subject;
      if (data.message) contactSvc.message = data.message;

      this.contactForm.get('email').setValue(contactSvc.email);
      this.contactForm.get('subject').setValue(contactSvc.subject);
      this.contactForm.get('message').setValue(contactSvc.message);

    } else if (data.dialogType === 'team') {
      this.title = this.config.boards[data.id].displayName;
    }
  }

  close() {
    this.dialogRef.close();
  }

  onContactFormSubmit($event) {
    this.contactSvc.sendContactMail(this.team.getSelectedTeam(), this.contactForm.controls.email.value, this.contactForm.controls.subject.value, this.contactForm.controls.message.value);
    this.formWasSubmitted = true;
    this.closeButtonText = 'Sluiten!';
    this.contactSvc.email = '';
    this.contactSvc.subject = '';
    this.contactSvc.message = '';
  }

  getContactFormErrorMessage(formCtrl: FormControl) {
    return formCtrl.hasError('required') ? 'Dit veld is verplicht' :
      formCtrl.hasError('email') ? 'Dit is geen geldig e-mailadres' :
        '';
  }
}
