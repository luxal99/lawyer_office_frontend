import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OfficeOverviewComponent } from './office-overview/office-overview.component';
import { RegistationComponent } from './registation/registation.component';
<<<<<<< Updated upstream
import { AuthService } from './service/auth.service';
=======
import {HeaderComponent} from './header/header.component';

>>>>>>> Stashed changes



const routes: Routes = [
<<<<<<< Updated upstream
  {path:'',component:LoginComponent},
  { path: 'overview', component: OfficeOverviewComponent,canActivate:[AuthService] },
  { path: 'register', component: RegistationComponent}
=======
  { path: '', component: LoginComponent },
  { path: 'register', component: RegistationComponent},
  {path: 'header', component: HeaderComponent}
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
