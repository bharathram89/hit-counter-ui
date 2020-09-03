import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPage0 } from './register/components/recruiterPage0/RegisterPage0.component'

import { RegisterPage2 } from './register/components/recruiterPage2/RegisterPage2.component'
import { RegisterPage1 } from './register/components/recruiterPage1/RegisterPage1.component'
import { AppComponent } from './app.component';
import { RegisterPage3 } from './register/components/recruiterPage3/RegisterPage3.component';
import { SignOn } from './non_secure/recruiterPage1/SignOn.component';
export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
  },
  {
    path: 'registerRecruiter0',
    component: RegisterPage0
  },
  {
    path: 'registerRecruiter1',
    component: RegisterPage1
  },
  {
    path: 'registerRecruiter2',
    component: RegisterPage2
  },
  {
    path: 'registerRecruiter3',
    component: RegisterPage3
  },
  {
    path: 'signOn',
    component: SignOn
  },
  { path: '**', redirectTo: '' }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
//   declarations: []
// })
// export default routes;
// export class AppRoutingModule {}
