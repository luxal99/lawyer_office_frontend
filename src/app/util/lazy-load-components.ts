import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { ComponentType } from '@angular/cdk/portal';
export class LazyLoadingComponents {
    static loadComponent(component: ComponentType<any>, entry: ViewContainerRef, cvRef: ViewContainerRef, resolver: ComponentFactoryResolver) {
        entry.clear();
        const factory = resolver.resolveComponentFactory(component)
        entry.createComponent(factory);
    }
}
