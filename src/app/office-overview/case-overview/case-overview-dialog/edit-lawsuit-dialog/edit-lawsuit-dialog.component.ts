import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { Case } from 'src/app/model/Case';
import { Lawsuit } from 'src/app/model/Lawsuit';
import { LawsuitService } from 'src/app/service/lawsuit.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-lawsuit-dialog',
  templateUrl: './edit-lawsuit-dialog.component.html',
  styleUrls: ['./edit-lawsuit-dialog.component.css']
})
export class EditLawsuitDialogComponent implements OnInit {

  @ViewChild('lawsuitEditor', { static: false }) lawsuitEditorComponent: CKEditorComponent;
  public LawsuitEditor = ClassicEditor;

  editLawsuitForm = new FormGroup({
    date: new FormControl(this.data.date, Validators.required)
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: Lawsuit, private lawsuitService: LawsuitService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  update() {
    let lawsuit = new Lawsuit(this.editLawsuitForm.get("date").value, this.lawsuitEditorComponent.editorInstance.getData(), this.data.id_case);
    lawsuit.id = this.data.id;
    lawsuit.date_formatted = formatDate(lawsuit.date, 'dd/MM/yyyy', 'en-US')

    this.lawsuitService.update(lawsuit).subscribe(resp => {
      this.openSnackBar("Uspešno ažurirano ročište", "DONE")
    }, err => {
      this.openSnackBar("Dogodila se greška pri ažuriranju", "PONOVI")
    })

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
