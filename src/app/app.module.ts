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
<<<<<<< Updated upstream
import { HttpClientModule } from '@angular/common/http';
=======
import { HeaderComponent } from './header/header.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistationComponent,
    OfficeOverviewComponent,
    CaseOverviewComponent,
    HeaderComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
