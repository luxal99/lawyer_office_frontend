import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/model/Client';
import { CaseService } from 'src/app/service/case.service';
import { ClientService } from 'src/app/service/client.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
@Component({
  selector: 'app-add-case-dialog',
  templateUrl: './add-case-dialog.component.html',
  styleUrls: ['./add-case-dialog.component.css']
})
export class AddCaseDialogComponent implements OnInit {

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  
  editorData = '';
  listOfClietns: Array<Client> = [];

  addCaseForm = new FormGroup({
    title: new FormControl("", Validators.required),
    creation_date: new FormControl("", Validators.required),
    id_client: new FormControl("", Validators.required)
  })

  lawsuitForm = new FormGroup({
    date: new FormControl("",Validators.required)
  })
  constructor(private clientService: ClientService, private caseService: CaseService) { }

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
}
