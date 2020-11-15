import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Case } from 'src/app/model/Case';
import { CaseService } from 'src/app/service/case.service';
import { ClientOverviewDialogComponent } from '../../client-overview/client-overview-dialog/client-overview-dialog.component';

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
    this.data.listOfLawsuits.forEach(lawsuit => {
      lawsuit.date_formatted = formatDate(lawsuit.date, 'dd/MM/yyyy', 'en-US');
    })

    if (this.data.status) {
      this.status = "Aktivan"
    } else {
      this.status = "Zatvoren"
    }

  }
  openClientOverview(client): void {
    const dialogRef = this.dialog.open(ClientOverviewDialogComponent, {
      minWidth: '70%',
      position: { right: '0' },
      height: '100vh',
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  changeStatus() {


    if (this.data.status) {
      this.data.status = false
    } else {
      this.data.status = true;
    }
    this.caseService.update(this.data).subscribe(resp => {
      console.log(resp);

    })
  }
}
