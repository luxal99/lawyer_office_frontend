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
  CLIENT_FORM_CONTROL_NAME,
  DATE_FORMAT,
  DATE_LOCALE, FormControlNames,
  SNACKBAR_BUTTON_TEXT,
  SNACKBAR_ERR_MESSAGE,
  VALID_SNACKBAR_MESSAGE
} from '../../../../constants/constant';


@Component({
  selector: 'app-edit-case-dialog',
  templateUrl: './edit-case-dialog.component.html',
  styleUrls: ['./edit-case-dialog.component.css']
})
export class EditCaseDialogComponent implements OnInit {

  selectedClient = {};

  @ViewChild('editor', {static: false}) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  @ViewChild('lawsuitEditor', {static: false}) lawsuitEditorComponent: CKEditorComponent;
  public LawsuitEditor = ClassicEditor;

  editorData = '';
  lawsuitEditorData = '';
  listOfClients: Array<Client> = [];

  addCaseForm = new FormGroup({
    title: new FormControl(this.data.title, Validators.required),
    creation_date: new FormControl(this.data.creationDate, Validators.required),
    id_client: new FormControl('', Validators.required)
  });

  lawsuitForm = new FormGroup({
    date: new FormControl('', Validators.required)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Case, private clientService: ClientService,
              private caseService: CaseService, private lawsuitService: LawsuitService, private snackBar: MatSnackBar) {
  }


  ngOnInit() {
    this.getAllClients();
    this.setSelectedClient();
  }

  setSelectedClient() {
    this.selectedClient = this.data.idClient.id;
  }

  getAllClients() {
    this.clientService.getAll().subscribe((resp) => {
      this.listOfClients = resp;
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

  async updateCase() {
    const caseEntity: Case = {
      note: this.editorComponent.editorInstance.getData(),
      id: this.data.id,
      creationDate: this.addCaseForm.get(FormControlNames.DATE_FORM_CONTROL).value,
      creationDateFormatted: formatDate(this.addCaseForm.get(FormControlNames.DATE_FORM_CONTROL).value, DATE_FORMAT, DATE_LOCALE)
    };
    await this.caseService.update(caseEntity).subscribe(() => {
    }, err => {
    });
    return caseEntity;
  }

  async saveLawsuit(idCase) {
    setTimeout(() => {
      const lawsuit: Lawsuit = {
        date: this.lawsuitForm.get(FormControlNames.DATE_FORM_CONTROL).value,
        note: this.lawsuitEditorComponent.editorInstance.getData(),
        dateFormatted: formatDate(this.lawsuitForm.get(FormControlNames.DATE_FORM_CONTROL).value, DATE_FORMAT, DATE_LOCALE),
        idCase
      };

      lawsuit.date.setHours(7);

      this.lawsuitService.save(lawsuit).subscribe(resp => {
        this.openSnackBar(VALID_SNACKBAR_MESSAGE, SNACKBAR_BUTTON_TEXT);
      }, err => {
        this.openSnackBar(SNACKBAR_ERR_MESSAGE, SNACKBAR_BUTTON_TEXT);
      });
    }, 100);
  }

  update() {
    if (document.getElementById('lawsuit').style.display === 'none') {
      this.updateCase().then(() => {
        this.openSnackBar(VALID_SNACKBAR_MESSAGE, SNACKBAR_BUTTON_TEXT);
      }, err => {
        console.log(err);
        this.openSnackBar(SNACKBAR_ERR_MESSAGE, SNACKBAR_BUTTON_TEXT);
      });
    } else {

      this.updateCase().then((resp) => {
        this.saveLawsuit(resp);
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
