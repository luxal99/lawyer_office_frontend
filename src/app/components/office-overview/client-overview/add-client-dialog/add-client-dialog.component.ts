import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Client} from 'src/app/model/Client';
import {ClientService} from 'src/app/service/client.service';
import {FormControlNames, FormFieldTypes, Icons, SNACKBAR_BUTTON_TEXT, SnackBarMessages} from '../../../../constants/constant';
import {FieldConfig} from '../../../../model/FieldConfig';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.css']
})
export class AddClientDialogComponent implements OnInit {

  heading = 'Dodavanje stranke';

  addClientForm = new FormGroup({
    fullName: new FormControl(this.data.fullName, Validators.required),
    email: new FormControl(this.data.email, Validators.required),
    telephone: new FormControl(this.data.telephone, Validators.required)
  });

  fullNameInputConfig: FieldConfig = {
    name: FormControlNames.FULL_NAME_FORM_CONTROL,
    type: FormFieldTypes.INPUT,
    label: 'Ime i prezime',
    inputType: 'text',
    placeholder: 'Marko Jankovic'
  };
  emailInputConfig: FieldConfig = {
    name: FormControlNames.EMAIL_FORM_CONTROL,
    type: FormFieldTypes.INPUT,
    placeholder: 'mail@example.com',
    label: 'Email',
    inputType: 'text'
  };
  telephoneInputConfig: FieldConfig = {
    inputType: 'text',
    name: FormControlNames.TELEPHONE_FORM_CONTROL,
    type: FormFieldTypes.INPUT,
    label: 'Kontakt telefon',
    placeholder: '0694131***'
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: Client, private clientService: ClientService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.setHeading();
  }

  setHeading() {
    if (this.data.id !== undefined) {
      this.heading = 'Izmena stranke';
    }
  }

  save() {
    const client: Client = this.addClientForm.getRawValue();
    if (this.data.id !== undefined) {
      client.id = this.data.id;
      this.clientService.update(client).subscribe(() => {
        this.openSnackBar(SnackBarMessages.SUCCESSFULLY, SNACKBAR_BUTTON_TEXT);
      }, () => {
        this.openSnackBar(SnackBarMessages.ERROR, SNACKBAR_BUTTON_TEXT);
      });
    } else {
      this.clientService.save(client).subscribe(() => {
        this.openSnackBar(SnackBarMessages.SUCCESSFULLY, SNACKBAR_BUTTON_TEXT);
      }, () => {
        this.openSnackBar(SnackBarMessages.ERROR, SNACKBAR_BUTTON_TEXT);
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
