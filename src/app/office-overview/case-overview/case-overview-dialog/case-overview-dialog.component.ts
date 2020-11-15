import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Case } from 'src/app/model/Case';

@Component({
  selector: 'app-case-overview-dialog',
  templateUrl: './case-overview-dialog.component.html',
  styleUrls: ['./case-overview-dialog.component.css']
})
export class CaseOverviewDialogComponent implements OnInit {

  

  constructor(@Inject(MAT_DIALOG_DATA) public data: Case) { }

  ngOnInit() {
    this.data.listOfLawsuits.forEach(lawsuit => {
      lawsuit.date_formatted = formatDate(lawsuit.date, 'dd/MM/yyyy', 'en-US');
    })

  }

}
