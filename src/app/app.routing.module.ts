import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomePage } from './non_secure_pages/welcomePage/welcomePage.component';
import { Register } from './non_secure_pages/register/register.component';
import { SignOn } from './non_secure_pages/signOn/signOn.component';
import { Home } from './secure/home/home.component';
import { NewGame } from './secure/newGame/newGame.component';
import { Scorecard } from './secure/scorecard/scorecard.component';
import { Profile } from './secure/profile/profile.component';
import { PastGames } from './secure/pastGames/pastGames.component';
import { CustomGames } from './secure/customGames/customGames.component';
import { NextRelease } from './non_secure_pages/nextRelease/nextRelease.component';
import { FeatureList } from './non_secure_pages/featureList/featureList.component';

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
  {
    path: 'profile',
    component:Profile
  },
  {
    path: 'pastGames',
    component:PastGames
  },
  {
    path: 'customGames',
    component:CustomGames
  },
  {
    path: 'nextRelease',
    component:NextRelease
  },
  {
    path: 'featureList',
    component:FeatureList
  },
  { path: '**', redirectTo: 'welcomePage' }
  // {
  //   path:'resetPass',
  //   component:ResetPass
  // },
  // { path: '**', redirectTo: 'welcomePage' }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
//   declarations: []
// })
// export default routes;
// export class AppRoutingModule {}
