import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomePage } from './non_secure_pages/welcomePage/welcomePage.component';
import { Register } from './non_secure_pages/register/register.component';
import { SignOn } from './non_secure_pages/signOn/signOn.component';
import { Home } from './secure/home/home.component';
import { NewGame } from './secure/newGame/newGame.component';
import { Scorecard } from './secure/scorecard/scorecard.component';

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
  {
    path: 'signOn',
    component: SignOn
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'newGame',
    component:NewGame
  },
  {
    path: 'scorecard',
    component:Scorecard
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
