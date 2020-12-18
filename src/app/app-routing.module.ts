import {RouterModule, Routes} from '@angular/router';

import {AuthService} from './service/auth.service';
import {LoginComponent} from './components/login/login.component';
import {NgModule} from '@angular/core';
import {OfficeOverviewComponent} from './components/office-overview/office-overview.component';
import {RegistationComponent} from './components/registation/registation.component';

const routes: Routes = [
  {path: '', component: OfficeOverviewComponent, canActivate: [AuthService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
