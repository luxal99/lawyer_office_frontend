import { ComponentFactoryResolver } from '@angular/core';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { async } from '@angular/core/testing';
import * as $ from "jquery"
@Component({
  selector: 'app-office-overview',
  templateUrl: './office-overview.component.html',
  styleUrls: ['./office-overview.component.css']
})
export class OfficeOverviewComponent implements OnInit {

  activeClass = "active";


  @ViewChild('target', { read: ViewContainerRef, static: false }) entry: ViewContainerRef;


  constructor(private cvRef: ViewContainerRef, private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }


  ngAfterViewInit(): void {
    this.initDefaultMenu();
  }


 async initDefaultMenu(){
   document.getElementById("overview-btn").click();
   const { GlobalOverviewComponent } = await import('./global-overview/global-overview.component');
   const factory = this.resolver.resolveComponentFactory(GlobalOverviewComponent)
   this.entry.createComponent(factory);
  }

  changeColor(e){
    var elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function(el) {
      el.classList.remove("active");
    });
    e.target.className = "active";
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

}
