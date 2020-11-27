import { ChartsModule, ThemeService } from 'ng2-charts';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatCalendar, MatCalendarBody, MatDatepicker, MatDatepickerToggle, MatMonthView } from '@angular/material';

import { AddCaseDialogComponent } from './components/office-overview/case-overview/add-case-dialog/add-case-dialog.component';
import { AddClientDialogComponent } from './components/office-overview/client-overview/add-client-dialog/add-client-dialog.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CaseOverviewComponent } from "./components/office-overview/case-overview/case-overview.component";
import { CaseOverviewDialogComponent } from './components/office-overview/case-overview/case-overview-dialog/case-overview-dialog.component';
import { ClientOverviewComponent } from './components/office-overview/client-overview/client-overview.component';
import { ClientOverviewDialogComponent } from './components/office-overview/client-overview/client-overview-dialog/client-overview-dialog.component';
import { ConfirmDialogComponent } from './components/office-overview/confirm-dialog/confirm-dialog.component';
import { EditCaseDialogComponent } from './components/office-overview/case-overview/edit-case-dialog/edit-case-dialog.component';
import { EditLawsuitDialogComponent } from './components/office-overview/case-overview/case-overview-dialog/edit-lawsuit-dialog/edit-lawsuit-dialog.component';
import { GlobalOverviewComponent } from './components/office-overview/global-overview/global-overview.component';
import { HeaderComponent } from './components/header/header.component';
import { HeadingComponent } from './components/heading/heading.component'
import { HttpClientModule } from '@angular/common/http';
import { LawsuitOverviewComponent } from './components/office-overview/lawsuit-overview/lawsuit-overview.component';
import { LoginComponent } from './components/login/login.component';
import { MatDaterangepickerModule } from 'mat-daterangepicker';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { OfficeOverviewComponent } from './components/office-overview/office-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistationComponent } from './components/registation/registation.component';
import { SearchLawsuitPipe } from './pipe/search-lawsuit.pipe';
import { UserProfileComponent } from './components/office-overview/user-profile/user-profile.component';
import { EDiaryOverviewComponent } from './components/office-overview/e-diary-overview/e-diary-overview.component';

;

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
    LawsuitOverviewComponent,
    SearchLawsuitPipe,
    EDiaryOverviewComponent
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
    ClientOverviewDialogComponent,ConfirmDialogComponent,LawsuitOverviewComponent, ClientOverviewComponent,UserProfileComponent, EditLawsuitDialogComponent, EditCaseDialogComponent, GlobalOverviewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
