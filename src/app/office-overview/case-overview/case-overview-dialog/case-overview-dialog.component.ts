
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalMethods } from 'src/app/dialog-global';
import { DialogOptions } from 'src/app/dialog-options';
import { Case } from 'src/app/model/Case';
import { CaseService } from 'src/app/service/case.service';
import { ClientOverviewDialogComponent } from '../../client-overview/client-overview-dialog/client-overview-dialog.component';
import { EditLawsuitDialogComponent } from './edit-lawsuit-dialog/edit-lawsuit-dialog.component';

@Component({
  selector: 'app-case-overview-dialog',
  templateUrl: './case-overview-dialog.component.html',
  styleUrls: ['./case-overview-dialog.component.css']
})
export class CaseOverviewDialogComponent implements OnInit {

  status: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: Case, private dialog: MatDialog, private caseService: CaseService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    if (this.data.status) {
      this.status = "Aktivan"
    } else {
      this.status = "Zatvoren"
    }

  }
  openClientOverview(client) {
    new GlobalMethods(this.dialog).openDialog(ClientOverviewDialogComponent,DialogOptions.getOptions(client))
  }

  openEditLawsuitDialog(lawsuit) {
    new GlobalMethods(this.dialog).openDialog(EditLawsuitDialogComponent,DialogOptions.getOptions(lawsuit)).afterClosed().subscribe(() => {
      this.findById();
    });
  }

  changeStatus() {


    if (this.data.status) {
      this.data.status = false
    } else {
      this.data.status = true;
    }
    this.caseService.update(this.data).subscribe(resp => {
    })
  }

  findById() {
    this.caseService.findById(this.data.id).subscribe(resp => {
      this.data = resp as Case
    })
  }
}
