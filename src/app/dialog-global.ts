import { AddCaseDialogComponent } from './office-overview/case-overview/add-case-dialog/add-case-dialog.component';
import { AddClientDialogComponent } from './office-overview/client-overview/add-client-dialog/add-client-dialog.component';
import { CaseOverviewDialogComponent } from './office-overview/case-overview/case-overview-dialog/case-overview-dialog.component';
import { Client } from './model/Client';
import { ClientOverviewDialogComponent } from './office-overview/client-overview/client-overview-dialog/client-overview-dialog.component';
import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DialogOptions } from './dialog-options';
import { EditCaseDialogComponent } from './office-overview/case-overview/edit-case-dialog/edit-case-dialog.component';
import { EditLawsuitDialogComponent } from './office-overview/case-overview/case-overview-dialog/edit-lawsuit-dialog/edit-lawsuit-dialog.component';
import { MatDialog } from '@angular/material';
import { UserProfileComponent } from './office-overview/user-profile/user-profile.component';

export class GlobalMethods<T> {

    constructor(private dialog: MatDialog) {
    }

    protected openDialog(component: ComponentType<T>, options: {}) {
        let dialogRef = this.dialog.open<T>(component, options)
        return dialogRef;
    }

    openCaseOverviewDialog(data) {
        return new GlobalMethods(this.dialog).openDialog(CaseOverviewDialogComponent, DialogOptions.getOptions(data));
    }

    openAddClientDialog(client: Client) {
        return new GlobalMethods(this.dialog).openDialog(AddClientDialogComponent, DialogOptions.getOptions(client));
    }

    openAddCaseDialog(data) {
        return new GlobalMethods(this.dialog).openDialog(AddCaseDialogComponent, DialogOptions.getOptions(data))
    }

    openClientOverview(client) {
        return new GlobalMethods(this.dialog).openDialog(ClientOverviewDialogComponent, DialogOptions.getOptions(client))
    }

    openEditCaseDialog(data) {
        return new GlobalMethods(this.dialog).openDialog(EditCaseDialogComponent, DialogOptions.getOptions(data))
    }

    openEditLawsuitDialog(lawsuit) {
        return new GlobalMethods(this.dialog).openDialog(EditLawsuitDialogComponent, DialogOptions.getOptions(lawsuit))
    }

    openUserProfileDialog() {
        return new GlobalMethods(this.dialog).openDialog(UserProfileComponent, DialogOptions.getOptions({}))
    }
}