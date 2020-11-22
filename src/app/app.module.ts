import { ChartsModule, ThemeService } from 'ng2-charts';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatCalendar, MatCalendarBody, MatDatepicker, MatDatepickerToggle, MatMonthView } from '@angular/material';

import { AddCaseDialogComponent } from './office-overview/case-overview/add-case-dialog/add-case-dialog.component';
import { AddClientDialogComponent } from './office-overview/client-overview/add-client-dialog/add-client-dialog.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CaseOverviewComponent } from "./office-overview/case-overview/case-overview.component";
import { CaseOverviewDialogComponent } from './office-overview/case-overview/case-overview-dialog/case-overview-dialog.component';
import { ClientOverviewComponent } from './office-overview/client-overview/client-overview.component';
import { ClientOverviewDialogComponent } from './office-overview/client-overview/client-overview-dialog/client-overview-dialog.component';
import { ConfirmDialogComponent } from './office-overview/confirm-dialog/confirm-dialog.component';
import { EditCaseDialogComponent } from './office-overview/case-overview/edit-case-dialog/edit-case-dialog.component';
import { EditLawsuitDialogComponent } from './office-overview/case-overview/case-overview-dialog/edit-lawsuit-dialog/edit-lawsuit-dialog.component';
import { GlobalOverviewComponent } from './office-overview/global-overview/global-overview.component';
import { HeaderComponent } from './header/header.component';
import { HeadingComponent } from './heading/heading.component'
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MatDaterangepickerModule } from 'mat-daterangepicker';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { OfficeOverviewComponent } from './office-overview/office-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistationComponent } from './registation/registation.component';
import { UserProfileComponent } from './office-overview/user-profile/user-profile.component';
import { LawsuitOverviewComponent } from './office-overview/lawsuit-overview/lawsuit-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistationComponent,
    CaseOverviewComponent,
    OfficeOverviewComponent,
    HeaderComponent,
    ClientOverviewComponent,
    GlobalOverviewComponent,
    AddClientDialogComponent,
    ClientOverviewDialogComponent,
    AddCaseDialogComponent,
    CaseOverviewDialogComponent,
    HeadingComponent,
    EditCaseDialogComponent,
    EditLawsuitDialogComponent,
    UserProfileComponent,
    ConfirmDialogComponent,
    LawsuitOverviewComponent
  ],
  imports: [
    MatDaterangepickerModule,
    BrowserModule,
    ChartsModule,
    CKEditorModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, ThemeService,HttpClientModule, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  entryComponents: [AddClientDialogComponent, MatDatepicker, MatCalendar, MatMonthView, MatCalendarBody, MatDatepickerToggle, AddCaseDialogComponent, CaseOverviewComponent, CaseOverviewDialogComponent,
    ClientOverviewDialogComponent,ConfirmDialogComponent, ClientOverviewComponent,UserProfileComponent, EditLawsuitDialogComponent, EditCaseDialogComponent, GlobalOverviewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
