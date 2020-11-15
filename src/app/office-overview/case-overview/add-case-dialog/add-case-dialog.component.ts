import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/model/Client';
import { CaseService } from 'src/app/service/case.service';
import { ClientService } from 'src/app/service/client.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { Case } from 'src/app/model/Case';
import { Observable } from 'rxjs';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Lawsuit } from 'src/app/model/Lawsuit';
import { LawsuitService } from 'src/app/service/lawsuit.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { da } from 'date-fns/locale';
@Component({
  selector: 'app-add-case-dialog',
  templateUrl: './add-case-dialog.component.html',
  styleUrls: ['./add-case-dialog.component.css']
})
export class AddCaseDialogComponent implements OnInit {

  selectedClient = {} ;

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  @ViewChild('lawsuitEditor', { static: false }) lawsuitEditorComponent: CKEditorComponent;
  public LawsuitEditor = ClassicEditor;

  editorData = '';
  lawsuitEditorData = '';
  listOfClietns: Array<Client> = [];

  addCaseForm = new FormGroup({
    title: new FormControl("", Validators.required),
    creation_date: new FormControl( Validators.required),
    id_client: new FormControl("", Validators.required)
  })

  lawsuitForm = new FormGroup({
    date: new FormControl("", Validators.required)
  })
  constructor(private clientService: ClientService, private caseService: CaseService,
    private _snackBar: MatSnackBar, private lawsuitService: LawsuitService) { }

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getAll().subscribe(resp => {
      this.listOfClietns = resp as Array<Client>
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

  async saveCase() {
    let caseEntity = new Case(
      this.addCaseForm.get("title").value,
      this.addCaseForm.get("creation_date").value,
      this.editorComponent.editorInstance.getData(),
      this.addCaseForm.get("id_client").value,
    );

    await this.caseService.save(caseEntity).subscribe(resp => {
      caseEntity.id = resp['id']
    }, err => {
    })


    console.log(caseEntity.creation_date);
    
    return caseEntity
  }

  async saveLawsuit(enCase) {
    setTimeout(() => {
      let lawsuit = new Lawsuit(this.lawsuitForm.get("date").value, this.lawsuitEditorComponent.editorInstance.getData(), enCase);

      this.lawsuitService.save(lawsuit).subscribe(resp => {

        this.openSnackBar("Uspešno ste sačuvali predmet i ročište", "DONE")
      }, err => {
        console.log(err);

        this.openSnackBar("Dogodila se greška pri čuvanju ročišta", "DONE")
      })
    }, 100);
  }

  save() {
    if (document.getElementById("lawsuit").style.display === "none") {
      this.saveCase().then(() => {
        this.openSnackBar("Uspešno ste sačuvali predmet", "DONE")
      },err=>{

        this.openSnackBar("Dogodila se greška pri čuvanju predmeta", "DONE")
      });
    } else {

      this.saveCase().then((resp) => {
        this.saveLawsuit(resp);
      })
    }
  }

  update(){
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
