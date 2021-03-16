import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Case} from 'src/app/model/Case';
import {CaseOverviewDialogComponent} from '../case-overview/case-overview-dialog/case-overview-dialog.component';
import {CaseService} from 'src/app/service/case.service';
import {Client} from 'src/app/model/Client';
import {ClientService} from 'src/app/service/client.service';
import {DialogOptions} from 'src/app/util/dialog-options';
import {GlobalMethods} from 'src/app/util/dialog-global';
import {Lawsuit} from 'src/app/model/Lawsuit';
import {LawsuitService} from 'src/app/service/lawsuit.service';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';
import {FormControlNames} from '../../../constants/constant';

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
  analyticsResponseData: Array<any> = [];
  analyticsData: Array<number> = [];

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Arhiviran', 'Aktivan'];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [{data: this.analyticsData, backgroundColor: ['#F45C43', '#2F80ED']}
  ];

  lawsuitForm = new FormGroup({
    date: new FormControl(Date.now(), Validators.required),
    idCase: new FormControl('', Validators.required)
  });


  constructor(private lawsuitService: LawsuitService, private caseService: CaseService,
              private clientService: ClientService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.getLastThreeCases();
    this.getNextThreeLawsuit();
    this.getAnalytics();
    this.getAllCases();
  }

  getAnalytics() {
    this.caseService.getCaseAnalytics().subscribe((resp) => {
      this.analyticsResponseData = resp;
      this.analyticsResponseData.forEach(res => {
        // tslint:disable-next-line:radix
        this.analyticsData.push(Number.parseInt(res.value));
      });

    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
    });
  }

  getAllCases() {
    this.clientService.getAll().subscribe(resp => {
      this.listOfClient = resp;
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
    });
  }

  getLastThreeCases() {
    this.caseService.getLastThreeCases().subscribe(resp => {
      this.listOfLastThreeCases = resp;
      this.listOfLastThreeCases.forEach(cs => {
        cs.creationDateFormatted = formatDate(cs.creationDate, 'dd/MM/yyyy', 'en-US');
      });
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
    });
  }

  getNextThreeLawsuit() {
    this.lawsuitService.getNextThreeLawsuit().subscribe(resp => {
      this.listOfNextThreeLawsuits = resp;

      this.listOfNextThreeLawsuits.forEach(lawsuit => {
        lawsuit.dateFormatted = formatDate(lawsuit.date, 'dd/MM/yyyy', 'en-US');

        lawsuit.idCase.creationDateFormatted = formatDate(lawsuit.idCase.creationDate, 'dd/MM/yyyy', 'en-US');
      });
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
    });
  }


  saveLawsuit() {
    const lawsuit: Lawsuit = {
      date: this.lawsuitForm.get(FormControlNames.DATE_FORM_CONTROL).value,
      idCase: this.lawsuitForm.get(FormControlNames.ID_CASE_FORM_CONTROL).value,
      dateFormatted: formatDate(this.lawsuitForm.get(FormControlNames.DATE_FORM_CONTROL).value, 'dd/MM/yyyy', 'en-US')
    };
    lawsuit.date.setHours(7);
    this.lawsuitService.save(lawsuit).subscribe(resp => {
      this.openSnackBar(`Uspešno dodato ročište predmetu: ${lawsuit.idCase.title}`, 'DONE');
      this.getNextThreeLawsuit();
    }, err => {
      this.openSnackBar('Dogodila se greška', 'POKUŠAJ PONOVO');
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  openCaseOverview(data) {
    GlobalMethods.openDialog(CaseOverviewDialogComponent, DialogOptions.getOptions(data), this.dialog).afterClosed().subscribe(resp => {
      this.getNextThreeLawsuit();
      this.getAllCases();
      this.getLastThreeCases();
    });
  }
}
