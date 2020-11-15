import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Case } from 'src/app/model/Case';
import { ClientOverviewDialogComponent } from '../../client-overview/client-overview-dialog/client-overview-dialog.component';

@Component({
  selector: 'app-case-overview-dialog',
  templateUrl: './case-overview-dialog.component.html',
  styleUrls: ['./case-overview-dialog.component.css']
})
export class CaseOverviewDialogComponent implements OnInit {

  

  constructor(@Inject(MAT_DIALOG_DATA) public data: Case,private dialog:MatDialog) { }

  ngOnInit() {
    this.data.listOfLawsuits.forEach(lawsuit => {
      lawsuit.date_formatted = formatDate(lawsuit.date, 'dd/MM/yyyy', 'en-US');
    })

  }

  openClientOverview(client): void {
    const dialogRef = this.dialog.open(ClientOverviewDialogComponent, {
      minWidth: '70%',
      position: { right: '0' },
      height: '100vh',
      data:client
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
