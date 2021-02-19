import {Component, OnInit} from '@angular/core';

import {AddCaseDialogComponent} from './add-case-dialog/add-case-dialog.component';
import {Case} from 'src/app/model/Case';
import {CaseOverviewDialogComponent} from './case-overview-dialog/case-overview-dialog.component';
import {CaseService} from 'src/app/service/case.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {DialogOptions} from 'src/app/util/dialog-options';
import {EditCaseDialogComponent} from './edit-case-dialog/edit-case-dialog.component';
import {GlobalMethods} from 'src/app/util/dialog-global';
import {MatDialog} from '@angular/material';
import {CONFIRM_LC} from '../../../constants/constant';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-case-overview',
  templateUrl: './case-overview.component.html',
  styleUrls: ['./case-overview.component.css']
})
export class CaseOverviewComponent implements OnInit {


  listOfCases: Array<Case> = [];

  // tslint:disable-next-line:variable-name
  _listOfCases: Array<Case> = [];

  text = '';

  searchForm = new FormGroup({
    search: new FormControl('')
  });


  constructor(private dialog: MatDialog, private caseService: CaseService) {
  }

  ngOnInit() {
    this.getAllCases();
  }

  getAllCases() {
    this.caseService.getAll().subscribe((resp) => {
      this.listOfCases = resp;
    });
  }

  openConfirmDialog(id: number) {
    GlobalMethods.openDialog(ConfirmDialogComponent, DialogOptions.getConfirmDialogOption(), this.dialog)
      .afterClosed().subscribe(() => {
      if (JSON.parse(localStorage.getItem(CONFIRM_LC))) {
        this.deleteCase(id);
        localStorage.removeItem(CONFIRM_LC);
      }
    });
  }

  async deleteCase(id) {
    this.caseService.delete(id).subscribe(() => {
      this.getAllCases();
    });
  }

  openAddCaseDialog(client): void {
    GlobalMethods.openDialog(AddCaseDialogComponent, DialogOptions.getOptions(client), this.dialog)
      .afterClosed().subscribe(() => {
      this.getAllCases();
    });
  }

  openCaseOverview(data): void {
    GlobalMethods.openDialog(CaseOverviewDialogComponent, DialogOptions.getOptions(data), this.dialog)
      .afterClosed().subscribe(() => {

    });
  }


  openEditCaseDialog(data): void {
    GlobalMethods.openDialog(EditCaseDialogComponent, DialogOptions.getOptions(data), this.dialog)
      .afterClosed().subscribe(() => {
      this.getAllCases();
    });
  }
}
