import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Lawsuit} from 'src/app/model/Lawsuit';
import {LawsuitService} from 'src/app/service/lawsuit.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {CKEditorComponent, ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {ViewChild} from '@angular/core';
import {NotesService} from 'src/app/service/notes.service';
import {Notes} from 'src/app/model/Notes';
import {GlobalMethods} from 'src/app/util/dialog-global';
import {CaseOverviewDialogComponent} from '../../case-overview/case-overview-dialog/case-overview-dialog.component';
import {DialogOptions} from 'src/app/util/dialog-options';
import {EditNotesDialogComponent} from './edit-notes-dialog/edit-notes-dialog.component';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {CaseService} from 'src/app/service/case.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from 'src/app/service/client.service';
import {Client} from 'src/app/model/Client';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-note-overview-dialog',
  templateUrl: './note-overview-dialog.component.html',
  styleUrls: ['./note-overview-dialog.component.css']
})
export class NoteOverviewDialogComponent implements OnInit {


  @ViewChild('editor', {static: false}) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;


  editorData = '';
  listOfNotes: Array<Notes> = [];
  listOfClients: Array<Client> = [];
  listOfLawsuits: Array<Lawsuit> = [];

  lawsuitForm = new FormGroup({
    id_case: new FormControl('', Validators.required)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public date, private lawsuitService: LawsuitService,
              private notesService: NotesService, private snackBar: MatSnackBar,
              private dialog: MatDialog, private clientService: ClientService) {
  }

  ngOnInit() {
    this.getLawsuitsForForwardedDate();
    this.getNotesForForwardedDate();
    this.getAllCases();
  }

  getLawsuitsForForwardedDate() {
    this.lawsuitService.getLawsuitsForForwardedDate(this.date).subscribe(resp => {
      this.listOfLawsuits = resp;
      this.listOfLawsuits.forEach(x => {
        x._bc_color = 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
      });
    });
  }

  getAllCases() {
    this.clientService.getAll().subscribe(resp => {
      this.listOfClients = resp;
    });
  }

  getNotesForForwardedDate() {
    this.notesService.getNotesForForwardedDate(this.date).subscribe(resp => {
      this.listOfNotes = resp;
      this.listOfLawsuits.forEach(x => {
        x._bc_color = 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
      });
    });
  }

  saveNote() {
    this.notesService.save(new Notes(this.date, this.editorComponent.editorInstance.getData())).subscribe(resp => {
      this.openSnackBar('Uspešno ste dodali belešku', 'OK');
      this.getNotesForForwardedDate();
    }, err => {
      console.log(err);

      this.openSnackBar('Dogodila se greška', 'DONE');
    });
  }

  deleteNote(id) {
    this.notesService.delete(id).subscribe(() => {
      this.getNotesForForwardedDate();
    });
  }

  openConfirmDialog(id: number) {
    GlobalMethods.openDialog(ConfirmDialogComponent, DialogOptions.getConfirmDialogOption(), this.dialog).afterClosed().subscribe(() => {
      if (JSON.parse(localStorage.getItem('confirm'))) {
        this.deleteNote(id);
        localStorage.removeItem('confirm');
      }
    });
  }

  saveLawsuit() {
    const lawsuit = new Lawsuit(this.date, '', this.lawsuitForm.get('id_case').value);
    lawsuit.date_formatted = formatDate(lawsuit.date, 'dd/MM/yyyy', 'en-US');

    lawsuit.date.setHours(7);
    this.lawsuitService.save(lawsuit).subscribe(resp => {
      this.openSnackBar(`Uspešno dodato ročište predmetu: ${lawsuit.id_case.title}`, 'DONE');

      this.getLawsuitsForForwardedDate();
    }, err => {
      this.openSnackBar('Dogodila se greška', 'POKUŠAJ PONOVO');
    });
  }

  openCaseDialog(data) {
    GlobalMethods.openDialog(CaseOverviewDialogComponent, DialogOptions.getOptions(data), this.dialog);
  }

  openEditNotesDialog(note) {
    GlobalMethods.openDialog(EditNotesDialogComponent, DialogOptions.getOptions(note), this.dialog).afterClosed().subscribe(() => {
      this.getNotesForForwardedDate();
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
