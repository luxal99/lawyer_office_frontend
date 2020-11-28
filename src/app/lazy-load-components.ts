import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { ComponentType } from '@angular/cdk/portal';
import { ViewChild } from '@angular/core';

export class LazyLoadingComponents<T> {
    

    constructor(private cvRef: ViewContainerRef, private resolver: ComponentFactoryResolver){

    }

    loadComponent(component: ComponentType<T>,entry:ViewContainerRef){
        entry.clear();
         const factory = this.resolver.resolveComponentFactory(component)
        entry.createComponent(factory);
    }
}