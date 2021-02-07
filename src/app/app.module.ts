import { BrowserModule } from '@angular/platform-browser';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { WelcomePage } from './non_secure_pages/welcomePage/welcomePage.component';
import { Register } from './non_secure_pages/register/register.component';
import { Header } from './components/header/header.component';
import { SignOn } from './non_secure_pages/signOn/signOn.component';
import { Home } from './secure/home/home.component';
import { NewGame } from './secure/newGame/newGame.component';
import { UserModelService } from './models/user.model';
import {NgxPaginationModule} from 'ngx-pagination';
import { Scorecard } from './secure/scorecard/scorecard.component';
import { GameModelService } from './models/game.model';
import { UserService } from './services/user.service';
import { GameService } from './services/game.service';  
import { Profile } from './secure/profile/profile.component';
import { SecureHeader } from './secure/secureHeader/secureHeader.component';
import { UserObjService } from './services/userObj.service';
import { PastGames } from './secure/pastGames/pastGames.component';
import { SecureFooter } from './secure/secureFooter/secureFooter.component';
import { CustomGames } from './secure/customGames/customGames.component';
import { NextRelease } from './non_secure_pages/nextRelease/nextRelease.component';
import { FeatureList } from './non_secure_pages/featureList/featureList.component';

  
  
@NgModule({
  declarations: [
    AppComponent,
    JwPaginationComponent,
   
    //NON Secure
    WelcomePage,
    Register,
    SignOn,
    NextRelease,
    FeatureList,

    //Secure
    Home,
    NewGame,
    Scorecard,  
    Profile,
    SecureHeader,
    SecureFooter,
    PastGames,
    CustomGames,
    
    Header
  ],
  imports: [ 
    BrowserModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide:UserService, 
    useClass:UserService
  },
  {
    provide:UserModelService, 
    useClass:UserModelService
  },
  {
    provide:GameModelService, 
    useClass:GameModelService
  },
  {
    provide:GameService, 
    useClass:GameService
  } ,
  {
    provide:UserObjService, 
    useClass:UserObjService
  } 
],
  bootstrap: [AppComponent]
})
export class AppModule { }
