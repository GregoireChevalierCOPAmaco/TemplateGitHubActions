import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from './app.authguard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { 
    path: 'login', 
    canActivate: [AppAuthGuard],
    component: LoginComponent,
    data: { roles: ['user'] } 
  },
  { 
    path: '',
    component: LoginComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AppAuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
