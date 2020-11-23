import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Client } from 'src/app/model/Client';

@Component({
  selector: 'app-client-overview-dialog',
  templateUrl: './client-overview-dialog.component.html',
  styleUrls: ['./client-overview-dialog.component.css']
})
export class ClientOverviewDialogComponent implements OnInit {

  activeCases = 0;
  closedCases = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Client) { }

  ngOnInit() {
    this.countCases();
  }

  countCases() {
    this.data.listOfCases.forEach(e => {
      if (e.status)
        this.activeCases++
      else if (!e.status)
        this.closedCases++
    })
  }

}
