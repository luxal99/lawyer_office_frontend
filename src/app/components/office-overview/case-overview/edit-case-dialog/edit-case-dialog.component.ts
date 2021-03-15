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
  DATE_LOCALE,
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
    creation_date: new FormControl(this.data.creation_date, Validators.required),
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
    this.selectedClient = this.data.id_client.id;
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
    const caseEntity = new Case(
      this.addCaseForm.get('title').value,
      this.addCaseForm.get('creation_date').value,
      this.editorComponent.editorInstance.getData()
    );

    caseEntity.id = this.data.id;
    caseEntity.creation_date_formatted = formatDate(caseEntity.creation_date, DATE_FORMAT, DATE_LOCALE);
    const client = new Client();
    client.id = this.addCaseForm.get(CLIENT_FORM_CONTROL_NAME).value;

    caseEntity.id_client = client;

    await this.caseService.update(caseEntity).subscribe(() => {
    }, err => {
    });
    return caseEntity;
  }

  async saveLawsuit(enCase) {
    setTimeout(() => {
      const lawsuit = new Lawsuit(this.lawsuitForm.get('date').value, this.lawsuitEditorComponent.editorInstance.getData(), enCase);
      lawsuit.date_formatted = formatDate(lawsuit.date, DATE_FORMAT, DATE_LOCALE);

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
