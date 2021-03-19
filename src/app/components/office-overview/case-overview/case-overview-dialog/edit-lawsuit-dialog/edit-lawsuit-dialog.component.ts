import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditorComponent} from '@ckeditor/ckeditor5-angular';
import {Case} from 'src/app/model/Case';
import {Lawsuit} from 'src/app/model/Lawsuit';
import {LawsuitService} from 'src/app/service/lawsuit.service';
import {formatDate} from '@angular/common';
import {
  DATE_FORMAT,
  DATE_LOCALE,
  FormControlNames,
  SNACKBAR_BUTTON_TEXT,
  SNACKBAR_ERR_MESSAGE, SnackBarMessages
} from '../../../../../constants/constant';

@Component({
  selector: 'app-edit-lawsuit-dialog',
  templateUrl: './edit-lawsuit-dialog.component.html',
  styleUrls: ['./edit-lawsuit-dialog.component.css']
})
export class EditLawsuitDialogComponent implements OnInit {

  @ViewChild('lawsuitEditor', {static: false}) lawsuitEditorComponent: CKEditorComponent;
  public LawsuitEditor = ClassicEditor;

  editLawsuitForm = new FormGroup({
    date: new FormControl(this.data.date, Validators.required)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Lawsuit, private lawsuitService: LawsuitService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  update() {
    const lawsuit: Lawsuit = {
      date: this.editLawsuitForm.get(FormControlNames.DATE_FORM_CONTROL).value,
      note: this.lawsuitEditorComponent.editorInstance.getData(),
      dateFormatted: formatDate(this.editLawsuitForm.get(FormControlNames.DATE_FORM_CONTROL).value, DATE_FORMAT, DATE_LOCALE),
    };

    lawsuit.date.setHours(7);

    this.lawsuitService.save(lawsuit).subscribe(resp => {
      this.openSnackBar(SnackBarMessages.SUCCESSFULLY, SNACKBAR_BUTTON_TEXT);
    }, err => {
      this.openSnackBar(SnackBarMessages.ERROR, SNACKBAR_BUTTON_TEXT);
    });

    this.lawsuitService.update(lawsuit).subscribe(resp => {
      this.openSnackBar(SnackBarMessages.SUCCESSFULLY, SNACKBAR_BUTTON_TEXT);
    }, err => {
      this.openSnackBar(SnackBarMessages.ERROR, SNACKBAR_BUTTON_TEXT);
    });

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
