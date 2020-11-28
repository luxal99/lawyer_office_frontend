import * as $ from "jquery"

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { CaseOverviewComponent } from './case-overview/case-overview.component';
import { ClientOverviewComponent } from './client-overview/client-overview.component';
import { ComponentFactoryResolver } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DialogOptions } from '../../dialog-options';
import { GlobalMethods } from '../../dialog-global';
import { GlobalOverviewComponent } from './global-overview/global-overview.component';
import { LawsuitOverviewComponent } from './lawsuit-overview/lawsuit-overview.component';
import { LazyLoadingComponents } from 'src/app/lazy-load-components';
import { MatDialog } from '@angular/material';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { async } from '@angular/core/testing';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-office-overview',
  templateUrl: './office-overview.component.html',
  styleUrls: ['./office-overview.component.css']
})
export class OfficeOverviewComponent implements OnInit {

  activeClass = "active";


  @ViewChild('target', { read: ViewContainerRef, static: false }) entry: ViewContainerRef;


  constructor(private cvRef: ViewContainerRef, private resolver: ComponentFactoryResolver, private dialog: MatDialog) { }

  ngOnInit() {
  }


  ngAfterViewInit(): void {
    this.initDefaultMenu();
  }


  async initDefaultMenu() {
    document.getElementById("overview-btn").click();
  }

  changeColor(e) {
    var elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function (el) {
      el.classList.remove("active");
    });
    e.target.className = "active";
  }

  openUserProfileDialog() {
    new GlobalMethods(this.dialog).openDialog(UserProfileComponent, DialogOptions.getOptions({}))
  }


  async loadGlobarOverview() {
    new LazyLoadingComponents(this.cvRef,this.resolver).loadComponent(GlobalOverviewComponent,this.entry)

  }

  async loadClientOverview() {
    new LazyLoadingComponents(this.cvRef,this.resolver).loadComponent(ClientOverviewComponent,this.entry)

  }

  async loadLawsuitOverview() {
    new LazyLoadingComponents(this.cvRef,this.resolver).loadComponent(LawsuitOverviewComponent,this.entry)
  }


  async loadCaseOverview() {
    new LazyLoadingComponents(this.cvRef,this.resolver).loadComponent(CaseOverviewComponent,this.entry)
  }
}
