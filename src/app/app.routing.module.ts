import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomePage } from './non_secure_pages/welcomePage/welcomePage.component';
import { Register } from './non_secure_pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
  },
  {
    path: 'welcomePage',
    component: WelcomePage
  },
  {
    path: 'register',
    component: Register
  },
  // {
  //   path:'resetPass',
  //   component:ResetPass
  // },
  { path: '**', redirectTo: 'welcomePage' }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
//   declarations: []
// })
// export default routes;
// export class AppRoutingModule {}
