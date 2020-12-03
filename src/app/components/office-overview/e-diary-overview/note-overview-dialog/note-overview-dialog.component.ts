import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Case } from 'src/app/model/Case';

@Component({
  selector: 'app-note-overview-dialog',
  templateUrl: './note-overview-dialog.component.html',
  styleUrls: ['./note-overview-dialog.component.css']
})
export class NoteOverviewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Case) { }

  ngOnInit() {
  }

}
