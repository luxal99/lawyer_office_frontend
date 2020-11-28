import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AddLawsuitDilaogComponent } from './add-lawsuit-dilaog/add-lawsuit-dilaog.component';
import { CaseOverviewDialogComponent } from '../case-overview/case-overview-dialog/case-overview-dialog.component';
import { DialogOptions } from 'src/app/util/dialog-options';
import { GlobalMethods } from 'src/app/util/dialog-global';
import { Lawsuit } from 'src/app/model/Lawsuit';
import { LawsuitService } from 'src/app/service/lawsuit.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-e-diary-overview',
  templateUrl: './e-diary-overview.component.html',
  styleUrls: ['./e-diary-overview.component.css']
})
export class EDiaryOverviewComponent implements OnInit {

  listOfLawsuits: Array<Lawsuit> = [];
  text = ''

  searchForm = new FormGroup({
    search: new FormControl("")
  })

  constructor(private lawsuitService: LawsuitService, private dialog: MatDialog) { }

  rangeForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  async ngOnInit(): Promise<void> {
    this.getLastSearch();
  }


  getLastSearch() {
    if (localStorage.getItem("lawsuitSearch")) {
      this.listOfLawsuits = JSON.parse(localStorage.getItem("lawsuitSearch"))
    }
  }

  openCaseDialog(data) {
     GlobalMethods.openDialog(AddLawsuitDilaogComponent, DialogOptions.getOptions(data),this.dialog)
  }

  getAllLawsuit() {
    this.lawsuitService.getLawsuitFromPeriod({ startDate: this.rangeForm.get("startDate").value, endDate: this.rangeForm.get("endDate").value }).subscribe(resp => {
      this.listOfLawsuits = resp
      this.listOfLawsuits.forEach(x => { x._bc_color = "hsl(" + Math.random() * 360 + ", 100%, 75%)" })

      localStorage.removeItem("lawsuitSearch")
      localStorage.setItem("lawsuitSearch", JSON.stringify(resp))


    })
  }
}
