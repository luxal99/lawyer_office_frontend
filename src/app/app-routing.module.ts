import {RouterModule, Routes} from '@angular/router';

import {AuthService} from './service/auth.service';
import {LoginComponent} from './components/login/login.component';
import {NgModule} from '@angular/core';
import {OfficeOverviewComponent} from './components/office-overview/office-overview.component';
import {RegistationComponent} from './components/registation/registation.component';
import {LOGIN_ROUTE, REGISTER_ROUTE} from './constants/constant';

const routes: Routes = [
  {path: '', component: OfficeOverviewComponent, canActivate: [AuthService]},
  {path: LOGIN_ROUTE, component: LoginComponent},
  {path: REGISTER_ROUTE, component: RegistationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
