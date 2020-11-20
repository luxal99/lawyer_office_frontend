import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

import { AddCaseDialogComponent } from '../case-overview/add-case-dialog/add-case-dialog.component';
import { Case } from 'src/app/model/Case';
import { CaseOverviewDialogComponent } from '../case-overview/case-overview-dialog/case-overview-dialog.component';
import { CaseService } from 'src/app/service/case.service';
import { Client } from 'src/app/model/Client';
import { ClientService } from 'src/app/service/client.service';
import { DialogOptions } from 'src/app/dialog-options';
import { GlobalMethods } from 'src/app/dialog-global';
import { Lawsuit } from 'src/app/model/Lawsuit';
import { LawsuitService } from 'src/app/service/lawsuit.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-global-overview',
  templateUrl: './global-overview.component.html',
  styleUrls: ['./global-overview.component.css']
})
export class GlobalOverviewComponent implements OnInit {

  currentDate = new Date();
  listOfClient: Array<Client> = [];
  listOfLastThreeCases: Array<Case> = [];
  listOfNextThreeLawsuits: Array<Lawsuit> = [];
  analyticsResponseData: Array<any> = []
  analyticsData: Array<any> = []

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Aktivan', 'Zatovren'];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartPlugins = [];


  lawsuitForm = new FormGroup({
    date: new FormControl(Date.now(), Validators.required),
    id_client: new FormControl("", Validators.required)
  })

  barChartData: ChartDataSets[] = [{ data: this.analyticsData, backgroundColor: ['#2F80ED', "#F45C43"] }
  ];

  constructor(private lawsuitService: LawsuitService, private caseService: CaseService,
    private clientService: ClientService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    this.getLastThreeCases();
    this.getNextThreeLawsuit();
    this.getAnalytics();
    this.getAllCases();
  }

  getAnalytics() {
    this.caseService.getCaseAnalytics().subscribe(resp => {
      this.analyticsResponseData = resp 

      this.analyticsResponseData.forEach(res => {
        this.analyticsData.push(Number.parseInt(res.value))
      })

    })
  }

  getAllCases() {
    this.clientService.getAll().subscribe(resp => {
      this.listOfClient = resp 
    })
  }

  getLastThreeCases() {
    this.caseService.getLastThreeCases().subscribe(resp => {
      this.listOfLastThreeCases = resp 
      this.listOfLastThreeCases.forEach(cs => {
        cs.creation_date_formatted = formatDate(cs.creation_date, 'dd/MM/yyyy', 'en-US');
      })
    })
  }

  getNextThreeLawsuit() {
    this.lawsuitService.getNextThreeLawsuit().subscribe(resp => {
      this.listOfNextThreeLawsuits = resp

      this.listOfNextThreeLawsuits.forEach(lawsuit => {
        lawsuit.date_formatted = formatDate(lawsuit.date, 'dd/MM/yyyy', 'en-US');

        lawsuit.id_case.creation_date_formatted = formatDate(lawsuit.id_case.creation_date, 'dd/MM/yyyy', 'en-US');
      })
    })
  }


  saveLawsuit() {
    let lawsuit = new Lawsuit(this.lawsuitForm.get("date").value, "", this.lawsuitForm.get("id_client").value);
    lawsuit.date_formatted = formatDate(lawsuit.date, 'dd/MM/yyyy', 'en-US')

    this.lawsuitService.save(lawsuit).subscribe(resp => {
      this.openSnackBar(`Uspešno dodato ročište predmetu: ${lawsuit.id_case.title}`, "DONE")

      this.getNextThreeLawsuit();
    }, err => {
      this.openSnackBar("Dogodila se greška", "POKUŠAJ PONOVO")
    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  openCaseOverview(data) {
    new GlobalMethods(this.dialog).openDialog(CaseOverviewDialogComponent, DialogOptions.getOptions(data))
  }
}
