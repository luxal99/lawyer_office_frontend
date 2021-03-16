import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Notes} from 'src/app/model/Notes';
import {NotesService} from 'src/app/service/notes.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {CKEditorComponent, ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'app-edit-notes-dialog',
  templateUrl: './edit-notes-dialog.component.html',
  styleUrls: ['./edit-notes-dialog.component.css']
})
export class EditNotesDialogComponent implements OnInit {

  @ViewChild('editor', {static: false}) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;


  editorData = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: Notes, private notesService: NotesService) {
  }

  ngOnInit() {
  }

  update() {
    this.notesService.update({
      date: this.data.date,
      note: this.editorComponent.editorInstance.getData(),
      id: this.data.id,
    }).subscribe(resp => {
      console.log(resp);

    });
  }

}
