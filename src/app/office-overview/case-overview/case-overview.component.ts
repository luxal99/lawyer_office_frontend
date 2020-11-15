import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Case } from 'src/app/model/Case';
import { CaseService } from 'src/app/service/case.service';
import { AddCaseDialogComponent } from './add-case-dialog/add-case-dialog.component';
import { CaseOverviewDialogComponent } from './case-overview-dialog/case-overview-dialog.component';
import { parse } from 'date-fns';
@Component({
  selector: 'app-case-overview',
  templateUrl: './case-overview.component.html',
  styleUrls: ['./case-overview.component.css']
})
export class CaseOverviewComponent implements OnInit {


  listOfCases: Array<Case> = [];

  _listOfCases: Array<Case> = [];
  constructor(private dialog: MatDialog, private caseService: CaseService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getAllCases();
  }

  getAllCases() {
    this.caseService.getAll().subscribe(resp => {
      this.listOfCases = resp as Array<Case>

      this.listOfCases.forEach(cs => {
        cs.creation_date_formatted = formatDate(cs.creation_date, 'dd/MM/yyyy', 'en-US');
      })
    })
  }


  openAddCaseDialog(): void {
    const dialogRef = this.dialog.open(AddCaseDialogComponent, {
      minWidth: '40%',
      position: { right: '0' },
      height: '100vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCases();
    });
  }

  openCaseOverview(client): void {
    const dialogRef = this.dialog.open(CaseOverviewDialogComponent, {
      minWidth: '50%',
      position: { right: '0' },
      height: '100vh',
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCases();
    });
  }
}
