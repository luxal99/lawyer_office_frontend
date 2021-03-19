import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditorComponent} from '@ckeditor/ckeditor5-angular';
import {Case} from 'src/app/model/Case';
import {Client} from 'src/app/model/Client';
import {Lawsuit} from 'src/app/model/Lawsuit';
import {CaseService} from 'src/app/service/case.service';
import {ClientService} from 'src/app/service/client.service';
import {LawsuitService} from 'src/app/service/lawsuit.service';
import {formatDate} from '@angular/common';
import {
  DATE_FORMAT,
  DATE_LOCALE, FormControlNames, FormFieldTypes,
  SNACKBAR_BUTTON_TEXT,
  SNACKBAR_ERR_MESSAGE, SnackBarMessages
} from '../../../../constants/constant';
import {FieldConfig} from '../../../../model/FieldConfig';


@Component({
  selector: 'app-edit-case-dialog',
  templateUrl: './edit-case-dialog.component.html',
  styleUrls: ['./edit-case-dialog.component.css']
})
export class EditCaseDialogComponent implements OnInit {

  @ViewChild('editor', {static: false}) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  @ViewChild('lawsuitEditor', {static: false}) lawsuitEditorComponent: CKEditorComponent;
  public LawsuitEditor = ClassicEditor;

  editorData = '';
  lawsuitEditorData = '';
  listOfClients: Array<Client> = [];

  addCaseForm = new FormGroup({
    title: new FormControl(this.data.title, Validators.required),
    creationDate: new FormControl(this.data.creationDate, Validators.required),
    idClient: new FormControl(this.data.idClient.id, Validators.required)
  });

  lawsuitForm = new FormGroup({
    date: new FormControl('', Validators.required)
  });

  titleInputConfig: FieldConfig = {
    inputType: 'text', label: 'Naziv predmeta',
    name: FormControlNames.TITLE_FORM_CONTROL, type: FormFieldTypes.INPUT
  };
  clientSelectConfig: FieldConfig = {
    inputType: FormFieldTypes.INPUT,
    label: 'Stranka',
    value: this.data.idClient.id,
    name: FormControlNames.ID_CLIENT_FORM_CONTROL,
    type: FormFieldTypes.SELECT
  };

  creationDateConfig: FieldConfig = {
    label: 'Datum početka'
  };


  constructor(@Inject(MAT_DIALOG_DATA) public data: Case, private clientService: ClientService,
              private caseService: CaseService, private lawsuitService: LawsuitService, private snackBar: MatSnackBar) {
  }


  ngOnInit() {
    this.getAllClients();
    console.log(this.data);
  }

  getAllClients() {
    this.clientService.getAll().subscribe((resp) => {
      this.listOfClients = resp;
      this.clientSelectConfig.options = resp;
    });
  }

  showLawsuitForm() {
    const x = document.getElementById('lawsuit');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  update() {
    const caseEntity: Case = {
      note: this.editorComponent.editorInstance.getData(),
      id: this.data.id,
      creationDate: this.addCaseForm.get(FormControlNames.CREATION_DATE_FORM_CONTROL).value,
      creationDateFormatted: formatDate(this.addCaseForm.get(FormControlNames.CREATION_DATE_FORM_CONTROL).value, DATE_FORMAT, DATE_LOCALE)
    };
    this.caseService.update(caseEntity).subscribe(() => {
      this.openSnackBar(SnackBarMessages.SUCCESSFULLY, SNACKBAR_BUTTON_TEXT);
    }, () => {
      this.openSnackBar(SnackBarMessages.ERROR, SNACKBAR_BUTTON_TEXT);
    });

    if (this.lawsuitForm.valid) {
      const lawsuit: Lawsuit = {
        date: this.lawsuitForm.get(FormControlNames.DATE_FORM_CONTROL).value,
        note: this.lawsuitEditorComponent.editorInstance.getData(),
        dateFormatted: formatDate(this.lawsuitForm.get(FormControlNames.DATE_FORM_CONTROL).value, DATE_FORMAT, DATE_LOCALE),
        idCase: this.data
      };
      lawsuit.date.setHours(7);
      this.lawsuitService.save(lawsuit).subscribe(() => {
        this.openSnackBar(SnackBarMessages.SUCCESSFULLY, SNACKBAR_BUTTON_TEXT);
      }, err => {
        this.openSnackBar(SNACKBAR_ERR_MESSAGE, SNACKBAR_BUTTON_TEXT);
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
