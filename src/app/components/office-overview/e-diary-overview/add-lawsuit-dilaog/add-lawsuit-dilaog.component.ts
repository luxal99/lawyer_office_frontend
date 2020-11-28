import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Case } from 'src/app/model/Case';
import { LawsuitService } from 'src/app/service/lawsuit.service';
import { formatDate } from '@angular/common';
import { Lawsuit } from 'src/app/model/Lawsuit';

@Component({
  selector: 'app-add-lawsuit-dilaog',
  templateUrl: './add-lawsuit-dilaog.component.html',
  styleUrls: ['./add-lawsuit-dilaog.component.css']
})
export class AddLawsuitDilaogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Case,private _snackBar: MatSnackBar,private lawsuitService:LawsuitService) { }


  lawsuitForm = new FormGroup({
    date: new FormControl("", Validators.required)
  })

  @ViewChild('editor', { static: false }) lawsuitEditorComponent: CKEditorComponent;
  public LawsuitEditor = ClassicEditor;


  lawsuitEditorData = '';
  ngOnInit() {
  }

   saveLawsuit() {
      let lawsuit = new Lawsuit(this.lawsuitForm.get("date").value, this.lawsuitEditorComponent.editorInstance.getData(), this.data);
      lawsuit.date_formatted = formatDate(lawsuit.date, 'dd/MM/yyyy', 'en-US');

      this.lawsuitService.save(lawsuit).subscribe(resp => {
        this.openSnackBar("Uspešno ste sačuvali predmet i ročište", "DONE")
        location.reload()
      }, err => {
        this.openSnackBar("Dogodila se greška pri čuvanju ročišta", "DONE")
      })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
