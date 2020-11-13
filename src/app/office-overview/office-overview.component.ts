import { ComponentFactoryResolver } from '@angular/core';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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

  changeColor(e){
    var elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function(el) {
      el.classList.remove("active");
    });
    e.target.className = "active";
  }

  

  ngAfterViewInit(): void {
    this.loadGlobarOverview()
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
