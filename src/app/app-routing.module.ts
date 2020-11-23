import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OfficeOverviewComponent } from './components/office-overview/office-overview.component';
import { RegistationComponent } from './components/registation/registation.component';
import {HeaderComponent} from './components/header/header.component';
import { AuthService } from './service/auth.service';




const routes: Routes = [
  {path:'',component:LoginComponent},
  { path: 'overview', component: OfficeOverviewComponent,canActivate:[AuthService] },
  { path: 'register', component: RegistationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
