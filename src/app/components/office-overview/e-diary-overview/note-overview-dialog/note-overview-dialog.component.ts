import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Case } from 'src/app/model/Case';
import { Lawsuit } from 'src/app/model/Lawsuit';
import { LawsuitService } from 'src/app/service/lawsuit.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { CKEditorComponent, ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { ViewChild } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { Notes } from 'src/app/model/Notes';
import { GlobalMethods } from 'src/app/util/dialog-global';
import { CaseOverviewDialogComponent } from '../../case-overview/case-overview-dialog/case-overview-dialog.component';
import { DialogOptions } from 'src/app/util/dialog-options';
@Component({
  selector: 'app-note-overview-dialog',
  templateUrl: './note-overview-dialog.component.html',
  styleUrls: ['./note-overview-dialog.component.css']
})
export class NoteOverviewDialogComponent implements OnInit {


  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;


  editorData = '';
  listOfNotes: Array<Notes> = [];

  listOfLawsuits: Array<Lawsuit> = [];
  constructor(@Inject(MAT_DIALOG_DATA) public date, private lawsuitService: LawsuitService,
    private notesService: NotesService, private _snackBar: MatSnackBar,private dialog:MatDialog) { }

  ngOnInit() {
    this.getLawsuitsForForwardedDate();
    this.getNotesForForwardedDate();
  }

  getLawsuitsForForwardedDate() {
    this.lawsuitService.getLawsuitsForForwardedDate(this.date).subscribe(resp => {
      this.listOfLawsuits = resp
      this.listOfLawsuits.forEach(x => { x._bc_color = "hsl(" + Math.random() * 360 + ", 100%, 75%)" })
    })
  }

  getNotesForForwardedDate() {
    this.notesService.getAll().subscribe(resp => {
      this.listOfNotes = resp;
      this.listOfLawsuits.forEach(x => { x._bc_color = "hsl(" + Math.random() * 360 + ", 100%, 75%)" })
    })
  }

  saveNote() {
    this.notesService.save(new Notes(this.date, this.editorComponent.editorInstance.getData())).subscribe(resp => {
      this.openSnackBar("Uspešno ste dodali belešku", "OK")
      this.getNotesForForwardedDate();
    }, err => {
      console.log(err);

      this.openSnackBar("Dogodila se greška", "DONE")
    })
  }

  openCaseDialog(data) {
    GlobalMethods.openDialog(CaseOverviewDialogComponent,DialogOptions.getOptions(data),this.dialog)
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
