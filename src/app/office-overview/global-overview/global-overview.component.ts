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
@Component({
  selector: 'app-global-overview',
  templateUrl: './global-overview.component.html',
  styleUrls: ['./global-overview.component.css']
})
export class GlobalOverviewComponent implements OnInit {

  listOfLastThreeCases: Array<Case> = [];
  listOfNextThreeLawsuits: Array<Lawsuit> = [];

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Aktivan','Zatovren'];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartPlugins = [];


  barChartData: ChartDataSets[] = [{ data: [1,2], backgroundColor: ['#2F80ED', "#F45C43"] }
  ];



  constructor(private lawsuitService: LawsuitService, private caseService: CaseService,private dialog:MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.getLastThreeCases();
    this.getNextThreeLawsuit();
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
      
      this.listOfNextThreeLawsuits.forEach(lawsuit=>{
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
