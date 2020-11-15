import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistationComponent } from './registation/registation.component';
import { OfficeOverviewComponent } from './office-overview/office-overview.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ClientOverviewComponent } from './office-overview/client-overview/client-overview.component';
import { GlobalOverviewComponent } from './office-overview/global-overview/global-overview.component';
import { AddClientDialogComponent } from './office-overview/client-overview/add-client-dialog/add-client-dialog.component';
import { ClientOverviewDialogComponent } from './office-overview/client-overview/client-overview-dialog/client-overview-dialog.component';
import { AddCaseDialogComponent } from './office-overview/case-overview/add-case-dialog/add-case-dialog.component';
import { CaseOverviewDialogComponent } from './office-overview/case-overview/case-overview-dialog/case-overview-dialog.component';
import { CaseOverviewComponent } from "./office-overview/case-overview/case-overview.component";
import { HeadingComponent } from './heading/heading.component'
import { DatePipe } from '@angular/common';
import { EditCaseDialogComponent } from './office-overview/case-overview/edit-case-dialog/edit-case-dialog.component';
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
    EditCaseDialogComponent
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  entryComponents: [AddClientDialogComponent, AddCaseDialogComponent, CaseOverviewComponent, CaseOverviewDialogComponent,
     ClientOverviewDialogComponent, ClientOverviewComponent, EditCaseDialogComponent,GlobalOverviewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
