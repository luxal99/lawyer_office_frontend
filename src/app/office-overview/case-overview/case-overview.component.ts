import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';

import { AddCaseDialogComponent } from './add-case-dialog/add-case-dialog.component';
import { Case } from 'src/app/model/Case';
import { CaseOverviewDialogComponent } from './case-overview-dialog/case-overview-dialog.component';
import { CaseService } from 'src/app/service/case.service';
import { EditCaseDialogComponent } from './edit-case-dialog/edit-case-dialog.component';
import { GlobalMethods } from 'src/app/dialog-global';
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
    new GlobalMethods(this.dialog).openAddCaseDialog(client).afterClosed().subscribe(() => {
      this.getAllCases();
    })
  }

  openCaseOverview(data): void {
    new GlobalMethods(this.dialog).openCaseOverviewDialog(data)
  }


  openEditCaseDialog(data): void {
    new GlobalMethods(this.dialog).openEditCaseDialog(data).afterClosed().subscribe(result => {
      this.getAllCases();
    })
  }
}
