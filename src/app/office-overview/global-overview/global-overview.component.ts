import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Case } from 'src/app/model/Case';
import { Lawsuit } from 'src/app/model/Lawsuit';
import { CaseService } from 'src/app/service/case.service';
import { LawsuitService } from 'src/app/service/lawsuit.service';
import { CaseOverviewDialogComponent } from '../case-overview/case-overview-dialog/case-overview-dialog.component';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/service/client.service';
import { Client } from 'src/app/model/Client';
@Component({
  selector: 'app-global-overview',
  templateUrl: './global-overview.component.html',
  styleUrls: ['./global-overview.component.css']
})
export class GlobalOverviewComponent implements OnInit {

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


  dateForm = new FormGroup({
    date: new FormControl(Date.now(), Validators.required),
    id_case: new FormControl("",Validators.required)
  })

  barChartData: ChartDataSets[] = [{ data: this.analyticsData, backgroundColor: ['#2F80ED', "#F45C43"] }
  ];

  test() {
    console.log('212121');

  }

  constructor(private lawsuitService: LawsuitService, private caseService: CaseService, private clientService:ClientService,private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.getLastThreeCases();
    this.getNextThreeLawsuit();
    this.getAnalytics();
    this.getAllCases();
  }

  getAnalytics() {
    this.caseService.getCaseAnalytics().subscribe(resp => {
      this.analyticsResponseData = resp as Array<any>

      this.analyticsResponseData.forEach(res => {
        this.analyticsData.push(Number.parseInt(res.value))
      })

    })
  }

  getAllCases() {
    this.clientService.getAll().subscribe(resp => {
      this.listOfClient = resp as Array<Client>
    })
  }

  getLastThreeCases() {
    this.caseService.getLastThreeCases().subscribe(resp => {
      this.listOfLastThreeCases = resp as Array<Case>
      this.listOfLastThreeCases.forEach(cs => {
        cs.creation_date_formatted = formatDate(cs.creation_date, 'dd/MM/yyyy', 'en-US');
      })
    })
  }

  getNextThreeLawsuit() {
    this.lawsuitService.getNextThreeLawsuit().subscribe(resp => {
      this.listOfNextThreeLawsuits = resp as Array<Lawsuit>

      this.listOfNextThreeLawsuits.forEach(lawsuit => {
        lawsuit.date_formatted = formatDate(lawsuit.date, 'dd/MM/yyyy', 'en-US');

        lawsuit.id_case.creation_date_formatted = formatDate(lawsuit.id_case.creation_date, 'dd/MM/yyyy', 'en-US');
      })
    })
  }

  openCaseOverview(cs): void {
    const dialogRef = this.dialog.open(CaseOverviewDialogComponent, {
      minWidth: '50%',
      position: { right: '0' },
      height: '100vh',
      data: cs
    });
  }
}
