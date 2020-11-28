import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { ComponentType } from '@angular/cdk/portal';
import { ViewChild } from '@angular/core';

export class LazyLoadingComponents<T> {

    constructor() {

    }

    static loadComponent(component: ComponentType<any>, entry: ViewContainerRef, cvRef: ViewContainerRef, resolver: ComponentFactoryResolver) {
        entry.clear();
        const factory = resolver.resolveComponentFactory(component)
        entry.createComponent(factory);
    }
}