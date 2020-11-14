import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistationComponent } from './registation/registation.component';
import { OfficeOverviewComponent } from './office-overview/office-overview.component';
import { CaseOverviewComponent } from './case-overview/case-overview.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ClientOverviewComponent } from './office-overview/client-overview/client-overview.component';
import { GlobalOverviewComponent } from './office-overview/global-overview/global-overview.component';
import { AddClientDialogComponent } from './office-overview/client-overview/add-client-dialog/add-client-dialog.component';
import { ClientOverviewDialogComponent } from './office-overview/client-overview/client-overview-dialog/client-overview-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistationComponent,
    OfficeOverviewComponent,
    CaseOverviewComponent,
    HeaderComponent,
    ClientOverviewComponent,
    GlobalOverviewComponent,
    AddClientDialogComponent,
    ClientOverviewDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [AddClientDialogComponent, ClientOverviewDialogComponent, ClientOverviewComponent, GlobalOverviewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
