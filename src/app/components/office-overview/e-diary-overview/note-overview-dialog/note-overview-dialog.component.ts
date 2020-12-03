import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Case } from 'src/app/model/Case';
import { Lawsuit } from 'src/app/model/Lawsuit';
import { LawsuitService } from 'src/app/service/lawsuit.service';

@Component({
  selector: 'app-note-overview-dialog',
  templateUrl: './note-overview-dialog.component.html',
  styleUrls: ['./note-overview-dialog.component.css']
})
export class NoteOverviewDialogComponent implements OnInit {


  listOfLawsuits: Array<Lawsuit> = [];
  constructor(@Inject(MAT_DIALOG_DATA) public date, private lawsuitService: LawsuitService) { }

  ngOnInit() {
    this.getLawsuitsForForwardedDate();
  }

  getLawsuitsForForwardedDate() {
    this.lawsuitService.getLawsuitsForForwardedDate(this.date).subscribe(resp => {
      this.listOfLawsuits = resp
      this.listOfLawsuits.forEach(x => { x._bc_color = "hsl(" + Math.random() * 360 + ", 100%, 75%)" })
    })
  }

}
