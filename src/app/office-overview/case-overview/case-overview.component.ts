import { Component, OnInit } from '@angular/core';

import { AddCaseDialogComponent } from './add-case-dialog/add-case-dialog.component';
import { Case } from 'src/app/model/Case';
import { CaseOverviewDialogComponent } from './case-overview-dialog/case-overview-dialog.component';
import { CaseService } from 'src/app/service/case.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogOptions } from 'src/app/dialog-options';
import { EditCaseDialogComponent } from './edit-case-dialog/edit-case-dialog.component';
import { GlobalMethods } from 'src/app/dialog-global';
import { MatDialog } from '@angular/material';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-case-overview',
  templateUrl: './case-overview.component.html',
  styleUrls: ['./case-overview.component.css']
})
export class CaseOverviewComponent implements OnInit {


  listOfCases: Array<Case> = [];

  _listOfCases: Array<Case> = [];
  constructor(private dialog: MatDialog, private caseService: CaseService) { }

  ngOnInit() {
    this.getAllCases();
  }

  getAllCases() {
    this.caseService.getAll().subscribe(resp => {
      this.listOfCases = resp
    })
  }

  openConfirmDialog(id: number) {
    new GlobalMethods(this.dialog).openDialog(ConfirmDialogComponent, DialogOptions.getConfirmDialogOption()).afterClosed().subscribe(() => {
      if (JSON.parse(localStorage.getItem("confirm"))) {
        this.deleteCase(id)
        localStorage.removeItem("confirm")
      }
    })
  }

  async deleteCase(id) {
    this.caseService.delete(id).subscribe(resp => {
      this.getAllCases()
    })
  }

  openAddCaseDialog(client): void {
    new GlobalMethods<AddCaseDialogComponent>(this.dialog).openDialog(AddCaseDialogComponent, DialogOptions.getOptions(client)).afterClosed().subscribe(() => {
      this.getAllCases();
    })
  }

  openCaseOverview(data): void {
    new GlobalMethods(this.dialog).openDialog(CaseOverviewDialogComponent, DialogOptions.getOptions(data))
  }


  openEditCaseDialog(data): void {
    new GlobalMethods(this.dialog).openDialog(EditCaseDialogComponent, DialogOptions.getOptions(data)).afterClosed().subscribe(result => {
      this.getAllCases();
    })
  }
}
