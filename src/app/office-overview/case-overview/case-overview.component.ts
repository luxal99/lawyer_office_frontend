import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Case } from 'src/app/model/Case';
import { CaseService } from 'src/app/service/case.service';
import { AddCaseDialogComponent } from './add-case-dialog/add-case-dialog.component';

@Component({
  selector: 'app-case-overview',
  templateUrl: './case-overview.component.html',
  styleUrls: ['./case-overview.component.css']
})
export class CaseOverviewComponent implements OnInit {


  listOfCases: Array<Case> = [];
  constructor(private dialog: MatDialog, private caseService: CaseService) { }

  ngOnInit() {
  }

  getAllCases() {
    this.caseService.getAll().subscribe(resp => {
      this.listOfCases = resp as Array<Case>
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
}
