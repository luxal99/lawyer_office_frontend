import * as $ from "jquery"

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { ComponentFactoryResolver } from '@angular/core';
import { DialogOptions } from '../dialog-options';
import { GlobalMethods } from '../dialog-global';
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
    this.entry.clear();
    const { GlobalOverviewComponent } = await import('./global-overview/global-overview.component');
    const factory = this.resolver.resolveComponentFactory(GlobalOverviewComponent)
    this.entry.createComponent(factory);
  }

  async loadClientOverview() {
    this.entry.clear();
    const { ClientOverviewComponent } = await import('./client-overview/client-overview.component');
    const factory = this.resolver.resolveComponentFactory(ClientOverviewComponent)
    this.entry.createComponent(factory);
  }

  async loadLawsuitOverview() {
    this.entry.clear();
    const { LawsuitOverviewComponent } = await import('./lawsuit-overview/lawsuit-overview.component');
    const factory = this.resolver.resolveComponentFactory(LawsuitOverviewComponent)
    this.entry.createComponent(factory);
  }


  async loadCaseOverview() {
    this.entry.clear();
    const { CaseOverviewComponent } = await import('./case-overview/case-overview.component');
    const factory = this.resolver.resolveComponentFactory(CaseOverviewComponent)
    this.entry.createComponent(factory);
  }
}
