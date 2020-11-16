import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';

import { AddCaseDialogComponent } from './add-case-dialog/add-case-dialog.component';
import { Case } from 'src/app/model/Case';
import { CaseOverviewDialogComponent } from './case-overview-dialog/case-overview-dialog.component';
import { CaseService } from 'src/app/service/case.service';
import { EditCaseDialogComponent } from './edit-case-dialog/edit-case-dialog.component';
import { MatDialog } from '@angular/material';
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
    })
  }


  openAddCaseDialog(client): void {
    const dialogRef = this.dialog.open(AddCaseDialogComponent, {
      minWidth: '40%',
      position: { right: '0' },
      height: '100vh',
      data:client
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


  openEditCaseDialog(client): void {
    const dialogRef = this.dialog.open(EditCaseDialogComponent, {
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
