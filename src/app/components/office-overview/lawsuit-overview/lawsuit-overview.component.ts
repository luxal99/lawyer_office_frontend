import { AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { CaseOverviewDialogComponent } from '../case-overview/case-overview-dialog/case-overview-dialog.component';
import { DialogOptions } from 'src/app/util/dialog-options';
import { GlobalMethods } from 'src/app/util/dialog-global';
import { Lawsuit } from 'src/app/model/Lawsuit';
import { LawsuitService } from 'src/app/service/lawsuit.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-lawsuit-overview',
  templateUrl: './lawsuit-overview.component.html',
  styleUrls: ['./lawsuit-overview.component.css']
})
export class LawsuitOverviewComponent implements OnInit {

  listOfLawsuits: Array<Lawsuit> = [];
  text = ''

  searchForm = new FormGroup({
    search: new FormControl("")
  })
  constructor(private dialog: MatDialog, private lawsuitService: LawsuitService, private cdref: ChangeDetectorRef) { }

  ngOnInit() {

    this.getAllLawsuitsForCurrentMonth();
  }

  ngAfterViewChecked() {

    this.cdref.detectChanges();

  }
  getRandom() {
    return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  }

  showLawsuitForm() {
    const x = document.getElementById("lawsuit");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  getAllLawsuitsForCurrentMonth() {
    this.lawsuitService.getLawsuitForCurrentMonth().subscribe(resp => {
      this.listOfLawsuits = resp
      this.listOfLawsuits.forEach(x => { x._bc_color = "hsl(" + Math.random() * 360 + ", 100%, 75%)" })

    })
  }

  openCaseDialog(data) {
     GlobalMethods.openDialog(CaseOverviewDialogComponent, DialogOptions.getOptions(data),this.dialog)
  }

}
