import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistationComponent } from './registation/registation.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegistationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
