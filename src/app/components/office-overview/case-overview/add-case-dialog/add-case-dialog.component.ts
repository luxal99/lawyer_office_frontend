import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {CKEditorComponent} from '@ckeditor/ckeditor5-angular';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Case} from 'src/app/model/Case';
import {CaseService} from 'src/app/service/case.service';
import {Client} from 'src/app/model/Client';
import {ClientService} from 'src/app/service/client.service';
import {Lawsuit} from 'src/app/model/Lawsuit';
import {LawsuitService} from 'src/app/service/lawsuit.service';
import {formatDate} from '@angular/common';
import {
  DATE_FORMAT,
  DATE_LOCALE,
  FormControlNames,
  FormFieldTypes,
  SNACKBAR_BUTTON_TEXT,
  SnackBarMessages
} from '../../../../constants/constant';
import {FieldConfig} from '../../../../model/FieldConfig';

@Component({
  selector: 'app-add-case-dialog',
  templateUrl: './add-case-dialog.component.html',
  styleUrls: ['./add-case-dialog.component.css']
})
export class AddCaseDialogComponent implements OnInit {


  @ViewChild('editor', {static: false}) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;
  @ViewChild('lawsuitEditor', {static: false}) lawsuitEditorComponent: CKEditorComponent;
  public LawsuitEditor = ClassicEditor;

  editorData = '';
  lawsuitEditorData = '';
  listOfClients: Array<Client> = [];

  addCaseForm = new FormGroup({
    title: new FormControl('', Validators.required),
    creationDate: new FormControl(''),
    idClient: new FormControl('', Validators.required)
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
    name: FormControlNames.ID_CLIENT_FORM_CONTROL,
    type: FormFieldTypes.SELECT
  };

  constructor(private clientService: ClientService, private caseService: CaseService,
              private snackBar: MatSnackBar, private lawsuitService: LawsuitService) {
  }

  ngOnInit() {
    this.getAllClients();
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


  save() {
    let date = new Date();
    if (this.addCaseForm.get(FormControlNames.CREATION_DATE_FORM_CONTROL).value) {
      date = this.addCaseForm.get(FormControlNames.CREATION_DATE_FORM_CONTROL).value;
    }
    const caseEntity: Case = {
      creationDate: date,
      title: this.addCaseForm.get(FormControlNames.TITLE_FORM_CONTROL).value,
      creationDateFormatted: formatDate(date, DATE_FORMAT, DATE_LOCALE),
      idClient: {id: this.addCaseForm.get(FormControlNames.ID_CLIENT_FORM_CONTROL).value}
    };
    caseEntity.creationDate.setHours(7);
    this.caseService.save(caseEntity).subscribe((resp) => {
      caseEntity.id = resp.id;
      this.openSnackBar(SnackBarMessages.SUCCESSFULLY, SNACKBAR_BUTTON_TEXT);
    }, () => {
      this.openSnackBar(SnackBarMessages.ERROR, SNACKBAR_BUTTON_TEXT);
    });

    if (this.lawsuitForm.valid) {
      const lawsuit: Lawsuit = {
        note: this.lawsuitEditorComponent.editorInstance.getData(),
        idCase: caseEntity,
        date: this.lawsuitForm.get(FormControlNames.DATE_FORM_CONTROL).value,
        dateFormatted: formatDate(this.lawsuitForm.get(FormControlNames.DATE_FORM_CONTROL).value, DATE_FORMAT, DATE_LOCALE)
      };
      lawsuit.date.setHours(7);

      this.lawsuitService.save(lawsuit).subscribe(() => {
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
