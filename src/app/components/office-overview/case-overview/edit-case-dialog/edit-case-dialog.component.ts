import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { Case } from 'src/app/model/Case';
import { Client } from 'src/app/model/Client';
import { Lawsuit } from 'src/app/model/Lawsuit';
import { CaseService } from 'src/app/service/case.service';
import { ClientService } from 'src/app/service/client.service';
import { LawsuitService } from 'src/app/service/lawsuit.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-edit-case-dialog',
  templateUrl: './edit-case-dialog.component.html',
  styleUrls: ['./edit-case-dialog.component.css']
})
export class EditCaseDialogComponent implements OnInit {

  selectedClient = {};

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  @ViewChild('lawsuitEditor', { static: false }) lawsuitEditorComponent: CKEditorComponent;
  public LawsuitEditor = ClassicEditor;

  editorData = '';
  lawsuitEditorData = '';
  listOfClietns: Array<Client> = [];

  addCaseForm = new FormGroup({
    title: new FormControl(this.data.title, Validators.required),
    creation_date: new FormControl(this.data.creation_date, Validators.required),
    id_client: new FormControl("", Validators.required)
  })

  lawsuitForm = new FormGroup({
    date: new FormControl("", Validators.required)
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: Case, private clientService: ClientService,
    private caseService: CaseService, private lawsuitService: LawsuitService, private _snackBar: MatSnackBar) { }


  ngOnInit() {
    this.getAllClients();
    this.setSelectedClient();
  }

  setSelectedClient() {
    this.selectedClient = this.data.id_client.id
  }
  getAllClients() {
    this.clientService.getAll().subscribe(resp => {
      this.listOfClietns = resp 
    })
  }

  showLawsuitForm() {
    const x = document.getElementById("lawsuit");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  async updateCase() {
    let caseEntity = new Case(
      this.addCaseForm.get("title").value,
      this.addCaseForm.get("creation_date").value,
      this.editorComponent.editorInstance.getData()
    );

    
    caseEntity.id = this.data.id;
    caseEntity.creation_date_formatted = formatDate(caseEntity.creation_date, 'dd/MM/yyyy', 'en-US')
    let client = new Client();
    client.id = this.addCaseForm.get("id_client").value;

    caseEntity.id_client = client;
    caseEntity.creation_date.setHours(7)


    await this.caseService.update(caseEntity).subscribe(resp => {
    }, err => {
    })
    return caseEntity
  }

  async saveLawsuit(enCase) {
    setTimeout(() => {
      let lawsuit = new Lawsuit(this.lawsuitForm.get("date").value, this.lawsuitEditorComponent.editorInstance.getData(), enCase);
      lawsuit.date_formatted = formatDate(lawsuit.date, 'dd/MM/yyyy', 'en-US');

    lawsuit.date.setHours(7)

      this.lawsuitService.save(lawsuit).subscribe(resp => {
        this.openSnackBar("Uspešno ste sačuvali predmet i ročište", "DONE")
      }, err => {
        this.openSnackBar("Dogodila se greška pri čuvanju ročišta", "DONE")
      })
    }, 100);
  }

  update() {
    if (document.getElementById("lawsuit").style.display === "none") {
      this.updateCase().then(() => {
        this.openSnackBar("Uspešno ste sačuvali predmet", "DONE")
      }, err => {
        this.openSnackBar("Dogodila se greška pri čuvanju predmeta", "DONE")
      });
    } else {

      this.updateCase().then((resp) => {
        this.saveLawsuit(resp);
      })
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
