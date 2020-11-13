import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OfficeOverviewComponent } from './office-overview/office-overview.component';
import { RegistationComponent } from './registation/registation.component';
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
