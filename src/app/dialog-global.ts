import { AddCaseDialogComponent } from './components/office-overview/case-overview/add-case-dialog/add-case-dialog.component';
import { AddClientDialogComponent } from './components/office-overview/client-overview/add-client-dialog/add-client-dialog.component';
import { CaseOverviewDialogComponent } from './components/office-overview/case-overview/case-overview-dialog/case-overview-dialog.component';
import { Client } from './model/Client';
import { ClientOverviewDialogComponent } from './components/office-overview/client-overview/client-overview-dialog/client-overview-dialog.component';
import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DialogOptions } from './dialog-options';
import { EditCaseDialogComponent } from './components/office-overview/case-overview/edit-case-dialog/edit-case-dialog.component';
import { EditLawsuitDialogComponent } from './components/office-overview/case-overview/case-overview-dialog/edit-lawsuit-dialog/edit-lawsuit-dialog.component';
import { MatDialog } from '@angular/material';
import { UserProfileComponent } from './components/office-overview/user-profile/user-profile.component';

export class GlobalMethods<T> {

    constructor(private dialog: MatDialog) {
    }

     openDialog(component: ComponentType<T>, options: {}) {
        let dialogRef = this.dialog.open<T>(component, options)
        return dialogRef;
    }

}
